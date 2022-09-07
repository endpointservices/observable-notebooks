import define1 from "./1f41fef8b019cf4e@94.js";
import define2 from "./653c46ed55693b1f@646.js";
import define3 from "./0e0b35a92c819d94@444.js";
import define4 from "./f20d8159d88e6df4@1627.js";
import define5 from "./2b294a89125f5f7b@65.js";

function _1(md){return(
md`# \`cellstore\` 

This is the unlisted minimal implementation of \`cellstore\`, the main explanatory notebook can be found [here](https://observablehq.com/@endpointservices/cellstore)`
)}

function _cellstore(UI,htl,_,increment1,Event,hasLocalStorage,localStorage,$0,invalidation,canWrite,canRead,disposal){return(
({
  firebaseApp, // Will default to defaultApp if not provided
  prepareBackendURL = "https://webcode.run/observablehq.com/@endpointservices/login-with-comment;prepare",
  verifyBackendURL = "https://webcode.run/observablehq.com/@endpointservices/login-with-comment;verify",
  database = "https://datacell-us.firebaseio.com", // location of data
  key, // Key to identify the store within the @owner's namespace
  owner, // Required, string, e.g. tomlarkworthy -- who has data ownership?
  readers = [], // Array of Observable usernames, or 'all'
  writers = [], // Array of Observable usernames, or 'all'
  per_user = false, // Should each user have their own state?
  writes_per_day = 10 // can be updated to 10000 if per_user = true or 100 otherwise
} = {}) => {
  if (typeof owner !== "string") {
    throw new Error("All cellstores need an owner specified");
  }
  if (typeof key !== "string") {
    throw new Error(
      "All cellstores need a key specified to identify their keyspace"
    );
  }
  if (typeof per_user !== "boolean") {
    throw new Error("per_user should be a boolean");
  }
  if (typeof writes_per_day !== "number") {
    throw new Error("writes_per_day should be a number");
  }
  if (owner.includes("@"))
    throw new Error("owner must an Observablehq login without an @");
  if (!Array.isArray(writers) && writers !== "all")
    throw new Error("writers must be array or 'all'");
  if (Array.isArray(writers) && writers.find((e) => e.includes("@")))
    throw new Error(
      "writers array elements should be Observablehq logins without an @"
    );
  if (!Array.isArray(readers) && readers !== "all")
    throw new Error("readers must be array or 'all'");
  if (Array.isArray(readers) && readers.find((e) => e.includes("@")))
    throw new Error(
      "readers array elements should be Observablehq logins without an @"
    );
  if (per_user && writes_per_day > 10000)
    throw new Error(
      "per_user writes_per_day must be less than or equal to 10000"
    );
  if (!per_user && writes_per_day > 100)
    throw new Error(
      "per_user writes_per_day must be less than or equal to 100"
    );

  console.log("store: creating");
  const ui = UI({
    writes_per_day,
    owner,
    key
  });
  // core state
  let data, claims;
  // deps loading in background for fast loading
  let auth, db, ref, onValue, set, get, update, onAuthStateChanged, signOut;

  // auth and db are not ready until later
  let notifyDepsReady;
  let unsubscribes = {};
  const unsubscribeAll = () =>
    Object.values(unsubscribes).forEach((unsubscribe) => unsubscribe());

  let depsReady = new Promise((resolve) => (notifyDepsReady = resolve));

  // derived state
  const userUid = () => {
    if (auth) return auth.currentUser?.uid;
    else if (claims) {
      return claims.user_id;
    } else return undefined;
  };

  const username = () => {
    let match;
    const uid = userUid();
    if (!uid) {
      return null;
    } else if ((match = /observablehq\|([^|]*)/.exec(uid))) {
      return match[1];
    } else {
      return uid;
    }
  };

  const shard = () => (per_user ? username() : "_");
  const day = () => Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const dataPath = () => `data/${owner}/${key}/${shard()}`;
  const processPermissionsArray = (val) =>
    Array.isArray(val) ? val.map((usr) => `observablehq|${usr}`) : val;

  // We need to put the UI inside a span to stop cascading events leaking out
  const component = htl.html`<div><span onInput = ${
    // prevent ui events cascading
    (evt) => evt.stopPropagation()
  }>${ui}</span></div>`;

  // The data interface
  Object.defineProperty(component, "value", {
    get: () => data,
    set: (newVal) => {
      if (auth && per_user && !userUid()) {
        throw new Error("No user logged in");
      }
      depsReady.then(() => {
        const user = userUid();
        if (per_user && !user) {
          throw new Error("No user logged in");
        } else {
          if (_.isEqual(data, newVal)) return;
          // Apply the write a sparse write to all the important places
          const versionPath = `version/${owner}/${key}/${shard()}`;
          const dataPath = `data/${owner}/${key}/${shard()}`;
          const counterPath = `dailyWrites/${day()}/${owner}/${key}/${shard()}`;

          update(ref(db, "/"), {
            day: day(),
            [versionPath]: increment1,
            [counterPath]: increment1,
            [dataPath]: JSON.stringify(newVal)
          });
        }
      });
    },
    enumerable: true
  });
  const setOutput = (val) => {
    if (_.isEqual(data, val)) return;
    ui.value.data = val;
    data = val;
    component.dispatchEvent(new Event("input", { bubbles: true }));
  };

  if (hasLocalStorage) {
    const cachedClaims = localStorage.getItem("cellstore: user");
    if (cachedClaims) claims = JSON.parse(cachedClaims);
    const cachedData = localStorage.getItem(dataPath());
    if (cachedData) setOutput(JSON.parse(cachedData));
  }

  const reload = () => {
    $0
      .send({
        firebaseApp,
        prepareBackendURL,
        verifyBackendURL,
        key,
        owner,
        readers,
        writers,
        per_user,
        writes_per_day,
        database,
        invalidation
      })
      .then((deps) => {
        ({
          auth,
          db,
          ref,
          onValue,
          set,
          get,
          update,
          onAuthStateChanged,
          signOut,
          claims
        } = deps);
        const user = auth.currentUser;
        ui.value.userView = deps.userView;
        notifyDepsReady();

        // When auth changes, reload everything
        unsubscribes["user"] = onAuthStateChanged(auth, async (newUser) => {
          if (newUser === user) return; // do nothing
          unsubscribeAll();
          depsReady = new Promise((resolve) => (notifyDepsReady = resolve));
          reload();
        });

        // Manage writing of cache of last user claims, which is faster than waiting for auth to boot up
        {
          if (hasLocalStorage)
            localStorage.setItem(
              "cellstore: user",
              claims ? JSON.stringify(claims) : null
            );

          const context = {
            $shard: shard(),
            $owner: owner,
            $key: key,
            per_user,
            uid: claims?.user_id,
            realm: claims?.realm,
            teams: claims?.observablehq_com.split("|").slice(1, -1),
            writers: processPermissionsArray(writers),
            readers: processPermissionsArray(readers)
          };
          const writer = canWrite(context);
          const reader = canRead(context);
          const admin =
            user && claims?.["observablehq.com"]?.[owner] === "admin";

          if (writer && reader) ui.value.permissions = "read/write";
          if (admin & writer && reader)
            ui.value.permissions = `${admin ? "admin/" : ""}read/write`;
          else if (!writer && reader)
            ui.value.permissions = `${admin ? "admin/" : ""}read only`;
          else if (writer && !reader)
            ui.value.permissions = `${admin ? "admin/" : ""}write only`;
          else if (!writer && !reader)
            ui.value.permissions = `${admin ? "admin/" : ""}⚠️ no access`;

          ui.value.showWriteRate = writer;
          ui.value.showData = reader;
        }

        // Manage user visual, which is entirely driven by auth state changes

        if (!user) {
          ui.value.user = "anonymous";
          ui.value.signIn = () => (ui.value.screen = "login-with-comment");
          ui.value.signOut = false;
        } else {
          ui.value.screen = "info";
          ui.value.user = username();
          ui.value.signIn = false;
          ui.value.signOut = () => signOut(auth);
        }

        // Manage write counter, which is driven by
        // change in auth (can affect which write counter)
        // write counter changes (emitted by database)
        // TODO, also the bucket will tick over once a day but we will skip that complexity for now
        if (per_user && !user) {
          ui.value.writes = "unknown";
        } else {
          // We can do writes
          const counter = ref(
            db,
            `dailyWrites/${day()}/${owner}/${key}/${shard()}`
          );
          unsubscribes["writeCounter"] = onValue(
            counter,
            (snap) => {
              ui.value.writes = snap.val() || 0;
            },
            console.log
          );
        }
        // Manage data logic -- reactively driven by
        // Auth changes (if per_user)
        // Database version changes
        // Database value changes (if listening)
        // Writes
        if (per_user && !user) {
          setOutput(undefined);
        } else {
          // We can do reads
          const versionPath = `version/${owner}/${key}/${shard()}`;
          const versionRef = ref(db, versionPath);

          unsubscribes["versionListener"] = onValue(
            versionRef,
            (snap) => {
              const version = snap.val() || 0;
              ui.value.version = version;
              console.log("readAuthListener: new version", version);
              if (hasLocalStorage) {
                localStorage.setItem(versionPath, JSON.stringify(version));
              }
            },
            console.log
          );

          // TODO: only conditionally listen if our cache version is old
          const dataRef = ref(db, dataPath());

          unsubscribes["dataListener"] = onValue(
            dataRef,
            (snap) => {
              const data = JSON.parse(snap.val());
              console.log("dataListener: new data", data);
              setOutput(data);
              if (hasLocalStorage) {
                localStorage.setItem(dataPath(), JSON.stringify(data));
              }
            },
            console.log
          );
        }
      });
  };

  reload();

  disposal(component).then(unsubscribeAll);
  return component;
}
)}

function _cursor(){return(
function cursor(path, data, isNewData = false) {
  return {
    path,
    data,
    parent: () =>
      cursor(path.substring(0, path.lastIndexOf("/")), data, isNewData),
    child: (segment) => cursor(path + "/" + segment, data, isNewData),
    exists: () => data[path] !== undefined,
    val: () => {
      const val = data[path];
      if (val === undefined) return undefined;
      if (val[".sv"] && val[".sv"].increment)
        return isNewData ? val[".sv"].increment : 0;
      return val;
    }
  };
}
)}

function _fbstr(){return(
(string) => ({
  contains: (substring) => string.includes(substring)
})
)}

function _configFbData(cursor){return(
({ $owner, $key, $shard, writers, readers, per_user } = {}) => {
  const writerEntries = Array.isArray(writers)
    ? writers.map((uid) => [`/config/${$owner}/${$key}/writers/${uid}`, true])
    : [[`/config/${$owner}/${$key}/writers`, writers]];

  const readerEntries = Array.isArray(readers)
    ? readers.map((uid) => [`/config/${$owner}/${$key}/readers/${uid}`, true])
    : [[`/config/${$owner}/${$key}/readers`, readers]];

  return cursor(
    `/data/${$owner}/${$key}/${$shard}`,
    Object.fromEntries(
      [[`/config/${$owner}/${$key}/per_user`, per_user]]
        .concat(writerEntries)
        .concat(readerEntries)
    ),
    false
  );
}
)}

function _dataFbNewData(cursor,increment1){return(
({ $owner, $key, $shard }) =>
  cursor(
    `/data/${$owner}/${$key}/${$shard}`,
    {
      "/day": 1,
      [`/dailyWrites/1/${$owner}/${$key}/${$shard}`]: increment1,
      [`/version/${$owner}/${$key}/${$shard}`]: increment1,
      [`/data/${$owner}/${$key}/${$shard}`]: `"${Math.random()}"`
    },
    true
  )
)}

function _canWrite(runRule,data_write_rule,fbstr,dataFbNewData,configFbData){return(
({
  $shard,
  $owner,
  $key,
  realm,
  teams = [],
  uid,
  writers,
  readers,
  per_user = false
} = {}) =>
  runRule(data_write_rule, {
    $shard,
    $owner,
    $key,
    auth: {
      uid,
      token: {
        realm,
        observablehq_com: fbstr(`|${teams.join("|")}|`)
      }
    },
    newData: dataFbNewData({ $shard, $owner, $key }),
    data: configFbData({ $shard, $owner, $key, writers, readers, per_user })
  })
)}

function _canRead(runRule,data_read_rule,fbstr,dataFbNewData,configFbData){return(
({
  $shard,
  $owner,
  $key,
  realm,
  teams = [],
  uid,
  writers,
  readers,
  per_user = false
} = {}) =>
  runRule(data_read_rule, {
    $shard,
    $owner,
    $key,
    auth: {
      uid,
      token: {
        realm,
        observablehq_com: fbstr(`|${teams.join("|")}|`)
      }
    },
    newData: dataFbNewData({ $shard, $owner, $key }),
    data: configFbData({ $shard, $owner, $key, writers, readers, per_user })
  })
)}

function _runRule(){return(
function runRule(rule, { $shard, $owner, $key, auth, newData, data = {} }) {
  // The following is pasted from the JS security rules
  return eval(rule);
}
)}

function _data_write_rule(){return(
`
(
            	(
            	  // Either you are writing to a global location (!per_user)
                $shard == '_' 
                && data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/per_user').val() == false
              )
            	|| (
                // OR per_user so user has to match shard (per_user)
            		auth.token.observablehq_com.contains('|' + $shard + '|')
                && data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/per_user').val() == true
            		&& (
                  // Also you are signed in to the owners realm
              		auth.token.realm === $owner
                  // Or you have signed in to a personal realm that matches shard
                  || auth.token.realm === $shard
              	)
              )
            ) 
            // Check write permission
						&& (
              // Either writers is set to 'all'
              'all' == data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/writers').val()
              // Or config/.../writers contains auth.uid
              || data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/writers/' + auth.uid).exists()
            )
            // Check increment or new version counter 
            && newData.parent().parent().parent().parent().child('version/' + $owner + '/' + $key + '/' + $shard).val() == (data.parent().parent().parent().parent().child('version/' + $owner + '/' + $key + '/' + $shard).exists() ? data.parent().parent().parent().parent().child('version/' + $owner + '/' + $key + '/' + $shard).val() + 1: 1)
            // Check increment or new dailyWrites counter, note /day is used to figure out day
            && newData.parent().parent().parent().parent().child('dailyWrites/' + newData.parent().parent().parent().parent().child('day').val() + '/' + $owner + '/' + $key + '/' + $shard).val() == (data.parent().parent().parent().parent().child('dailyWrites/' + newData.parent().parent().parent().parent().child('day').val() + '/' + $owner + '/' + $key + '/' + $shard).exists() ? data.parent().parent().parent().parent().child('dailyWrites/' + newData.parent().parent().parent().parent().child('day').val() + '/' + $owner + '/' + $key + '/' + $shard).val() + 1 : 1)
            
`
)}

function _data_read_rule(){return(
`
            (
                (
                  // Either you are reading from a global location (anybody can do this from anywhere)
                  $shard == '_'
                  && data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/per_user').val() == false
                )
                || (
                  // OR per_user so user has to match shard
                  auth.token.observablehq_com.contains('|' + $shard + '|')
                  && data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/per_user').val() == true
                  && (
                      // Also you are signed in to the owners realm
                      auth.token.realm === $owner
                      // Or you have signed in to a personal realm that matches shard
                      || auth.token.realm === $shard
                  )
              )
            ) 
            // Check read permission
            && (
              // Either, readers is set to 'all'
              'all' == data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/readers').val()
              // Or config/.../readers contains auth.uid
              || data.parent().parent().parent().parent().child('config/' + $owner + '/' + $key + '/readers/' + auth.uid).exists()
            )
`
)}

function _UI(juice,render){return(
juice(render, {
  screen: "[0].screen",
  signIn: "[0].signIn",
  signOut: "[0].signOut",
  showData: "[0].showData",
  userView: "[0].userView",
  owner: "[0].owner",
  key: "[0].key",
  user: "[0].user",
  permissions: "[0].permissions",
  version: "[0].version",
  writes: "[0].writes",
  showWriteRate: "[0].showWriteRate",
  writes_per_day: "[0].writes_per_day",
  data: "[0].data"
})
)}

function _hasLocalStorage()
{
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}


function _increment1(){return(
{
  ".sv": {
    increment: 1
  }
}
)}

function _disposal(MutationObserver){return(
function disposal(element) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const target = element.closest(".observablehq");
      if (!target) return resolve();
      const observer = new MutationObserver(() => {
        if (target.contains(element)) return;
        observer.disconnect(), resolve();
      });
      observer.observe(target, { childList: true });
    });
  });
}
)}

function _params(flowQueue){return(
flowQueue({
  timeout_ms: 60000
})
)}

function _defaultApp(initializeApp){return(
initializeApp(
  {
    apiKey: "AIzaSyBquSsEgQnG_rHyasUA95xHN5INnvnh3gc",
    authDomain: "endpointserviceusers.firebaseapp.com",
    projectId: "endpointserviceusers"
  },
  "endpointserviceusers"
)
)}

function _auth(getAuth,params,defaultApp){return(
getAuth(params.firebaseApp || defaultApp)
)}

function _db(getDatabase,params,defaultApp){return(
getDatabase(params.firebaseApp || defaultApp, params.database)
)}

function _user(createLogin,params,defaultApp){return(
createLogin({
  firebaseApp: params.firebaseApp || defaultApp,
  verifyBackendURL: params.verifyBackendURL,
  prepareBackendURL: params.prepareBackendURL
})
)}

function _configSync(ref,db,params,auth,set){return(
new Promise(async (configSynced) => {
  // Helper function for converting permission parameters to DB representation
  const processPermissions = (val) =>
    Array.isArray(val)
      ? Object.fromEntries(val.map((usr) => [`observablehq|${usr}`, true]))
      : val;

  // Manage the owner/team member syncing the current config
  const refConfig = ref(db, `config/${params.owner}/${params.key}`);
  const user = auth.currentUser;
  if (
    user &&
    (await auth.currentUser.getIdTokenResult()).claims?.["observablehq.com"]?.[
      params.owner
    ] === "admin"
  ) {
    const config = {
      writes_per_day: params.writes_per_day,
      per_user: params.per_user,
      readers: processPermissions(params.readers),
      writers: processPermissions(params.writers)
    };

    console.log("configSyncer: syncing", config);
    await set(refConfig, config);
  }
  configSynced("OK");
})
)}

async function _getClaims(auth){return(
auth.currentUser
  ? (await auth.currentUser.getIdTokenResult()).claims
  : undefined
)}

function _cellstoreDeps(configSync,getClaims,auth,db,ref,onValue,set,get,update,onAuthStateChanged,signOut,$0,$1)
{
  configSync;
  const deps = {
    claims: getClaims,
    auth,
    db,
    ref,
    onValue,
    set,
    get,
    update,
    onAuthStateChanged,
    signOut,
    userView: $0
  };
  $1.resolve(deps);
  return deps;
}


function _render(html,htl,inspect){return(
({
  userView,
  username = null,
  screen = "info", // ["info", "login-with-comment"]
  key,
  owner,
  user,
  permissions,
  writes,
  writes_per_day,
  data,
  showData = false,
  showWriteRate = false,
  signIn = undefined,
  signOut = undefined,
  version
} = {}) => {
  return screen === "login-with-comment"
    ? userView
    : screen === "info"
    ? html`<table class="statestore" style="font: var(--monospace-font); size: 14px; table-layout:fixed;">
  <style>
  .statestore .observablehq--inspect {
    display: inline
  }
  .statestore .ibn {
    font-size: 11px;
  }
  </style>
  <tr>
    <td style="width: 50%">
      <a href="https://observablehq.com/@endpointservices/statestore" target="_black">👤</a>
      ${user}
      ${
        signIn
          ? htl.html`<button onClick=${signIn} class="ibn">signin</button>`
          : ""
      }
      ${
        signOut
          ? htl.html`<button onClick=${signOut} class="ibn">signout</button>`
          : ""
      }
    </td>
    <td>
      ${permissions}${
        showWriteRate
          ? htl.html`, ${writes} of ${writes_per_day} writes`
          : ""
      }
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://observablehq.com/@endpointservices/statestore" target="_black">💾
      @${owner}/${key}${version ? `@${version}` : ``}</a>
    </td>
    <td>
      ${showData ? htl.html`${inspect(data)}` : "🔒"}
    </td>
  </tr>
  
  </table>
</div>`
    : `unknown screen ${screen}`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("cellstore")).define("cellstore", ["UI","htl","_","increment1","Event","hasLocalStorage","localStorage","viewof params","invalidation","canWrite","canRead","disposal"], _cellstore);
  main.variable(observer("cursor")).define("cursor", _cursor);
  main.variable(observer("fbstr")).define("fbstr", _fbstr);
  main.variable(observer("configFbData")).define("configFbData", ["cursor"], _configFbData);
  main.variable(observer("dataFbNewData")).define("dataFbNewData", ["cursor","increment1"], _dataFbNewData);
  main.variable(observer("canWrite")).define("canWrite", ["runRule","data_write_rule","fbstr","dataFbNewData","configFbData"], _canWrite);
  main.variable(observer("canRead")).define("canRead", ["runRule","data_read_rule","fbstr","dataFbNewData","configFbData"], _canRead);
  main.variable(observer("runRule")).define("runRule", _runRule);
  main.variable(observer("data_write_rule")).define("data_write_rule", _data_write_rule);
  main.variable(observer("data_read_rule")).define("data_read_rule", _data_read_rule);
  main.variable(observer("UI")).define("UI", ["juice","render"], _UI);
  const child1 = runtime.module(define1);
  main.import("inspect", child1);
  const child2 = runtime.module(define2);
  main.import("juice", child2);
  main.variable(observer("hasLocalStorage")).define("hasLocalStorage", _hasLocalStorage);
  main.variable(observer("increment1")).define("increment1", _increment1);
  main.variable(observer("disposal")).define("disposal", ["MutationObserver"], _disposal);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  main.variable(observer("viewof params")).define("viewof params", ["flowQueue"], _params);
  main.variable(observer("params")).define("params", ["Generators", "viewof params"], (G, _) => G.input(_));
  main.variable(observer("defaultApp")).define("defaultApp", ["initializeApp"], _defaultApp);
  const child4 = runtime.module(define4);
  main.import("createLogin", child4);
  main.import("initializeApp", child4);
  main.import("getAuth", child4);
  main.import("onAuthStateChanged", child4);
  main.import("signOut", child4);
  const child5 = runtime.module(define5);
  main.import("getDatabase", child5);
  main.import("ref", child5);
  main.import("onValue", child5);
  main.import("set", child5);
  main.import("get", child5);
  main.import("update", child5);
  main.import("once", child5);
  main.variable(observer("auth")).define("auth", ["getAuth","params","defaultApp"], _auth);
  main.variable(observer("db")).define("db", ["getDatabase","params","defaultApp"], _db);
  main.variable(observer("viewof user")).define("viewof user", ["createLogin","params","defaultApp"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer("configSync")).define("configSync", ["ref","db","params","auth","set"], _configSync);
  main.variable(observer("getClaims")).define("getClaims", ["auth"], _getClaims);
  main.variable(observer("cellstoreDeps")).define("cellstoreDeps", ["configSync","getClaims","auth","db","ref","onValue","set","get","update","onAuthStateChanged","signOut","viewof user","viewof params"], _cellstoreDeps);
  main.variable(observer("render")).define("render", ["html","htl","inspect"], _render);
  return main;
}
