import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./c6e46a483fad9cef@36.js";
import define3 from "./11a5ab8b1b3a51db@1161.js";
import define4 from "./8d271c22db968ab0@160.js";
import define5 from "./ab3e70b29c480e6d@83.js";
import define6 from "./44969094bf0290d0@240.js";
import define7 from "./1bef71e497eda5fc@189.js";

async function _header(html,FileAttachment)
{
  return html`
    <div class="columns is-centered is-vcentered">
      <div class="column">
        <center>
        <img style=${{width:'80%'}} src="${await FileAttachment("minecraft.jpg").url()}"/>
        </center>
      </div>
      <div class="column">
        <div class="content">
          <h1>On Demand Minecraft Servers</h1>
          <p>
            Order servers by the hour with <b>no commitment</b>. This was designed for <b>causual gaming</b> with friends and families in mind. Try before you buy with complementary 1 EUR signup bonus (no credit card required).
          </p>
          <p>
            The servers have two prices. A low <b>daily storage costs</b> to keep your world between sessions (can be deleted anytime), and an <b>hourly running cost</b>, paid only when your server is switched on. You book how long you wish to play in advance, so <b>you can never accidentally leave your server running</b>. With this pricing model you can now afford a really good server and <b>pay only when actively used</b>.
          </p>

          <p>
            Its easy for you to share a server with friends by sharing a link. <b>Your freinds can turn on the server when they want to play, using their balance</b>. Everybody gets a 1 EUR signup bonus which would provide 10 hours of additional server time!
          </p>
        </div>
      </div>
    </div>
    `;
}


function _invites(firebase,invite,vmsCopy,html,api,pageParams)
{
  const hasAccount = firebase.auth().currentUser != null;
  const hasInvite = invite && (!hasAccount || !(hasAccount && vmsCopy.find(vm => vm.name == invite.name)));  
  return html`
    <center>
      ${hasInvite? html`
        <h2>You have been invited to a server!</h2>
        ${!hasAccount ? html`<h2> please <b>login</b> to accept. </h2>`
          : html`<button class="button is-primary"
          onclick=${() => api.processInvite(pageParams.invite)}
        >Accept</button>`
        }`: null
      }
    </center>
  `
}


function _signupPrompt(userCopy,html){return(
!userCopy ? html`
  <center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> Step 1. Create an account by signing in</h1>
    </div class="box">
  </div>
  </center>
`: html` `
)}

function _signin($0){return(
$0
)}

function _bonus(transactions,html,newUserBonus){return(
!transactions.find(tx => tx.type == 'NEW_USER') ? html`
  <center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> Step 2. Claim your new user bonus of ${newUserBonus.amount} ${newUserBonus.currency}</h1>
    </div class="box">
  </div>
  </center>
`: html` `
)}

function _profileView(db,user,html,username,balance,transactions,api,newUserBonus)
{
  function usernameKeyDown(evt) {
    if (evt.keyCode === 13) {
      console.log(evt.target)
      db.collection("usernames").doc(user.uid).set({name: evt.target.innerHTML}, {merge:true});
      // prevent the default behaviour of return key pressed
      return false;
    }
  }
  return html`
    <center class="content">
      username
      <h2 id="username" contenteditable onkeydown=${usernameKeyDown}>${(username || {}).name}</h2>
      <p>Current balance: €${balance["EUR"]}</p>
      ${!transactions.find(tx => tx.type == 'NEW_USER')?
        html`<button class="button is-warning" onclick=${() => api.claim('signin', newUserBonus)}>
          Click to claim your new user bonus of ${newUserBonus.amount} ${newUserBonus.currency}
        </button><br/>`
        :null}    
    </center>
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <span class="select">
          <select id="product_choice">
            <option value="price_1HeSBJHGNosi6Ft0qX1mdn61">€5</option>
            <option value="price_1HeSBJHGNosi6Ft0Dr3APW9w">€10</option>
            <option value="price_1HeSBJHGNosi6Ft0KGlUEjwz">€20</option>
            <option value="price_1HeSBJHGNosi6Ft0z0fiZAnq">€50</option>
          </select>
        </span>
      </p>
      <p class="control">
        <button class="button is-primary"
          onclick=${() => api.buy(document.getElementById("product_choice").value)}>
          Buy more credit
        </button>
      </p>
    </div>
  `
}


function _tutorial(vms,html){return(
vms.length == 0 ? html`
  <center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> Step 3a. Create a server</h1>
    </div class="box">
  </div>
  </center>
`: vms.length == 1 && vms[0].status == 'UNPROVISIONED' ? html`
  <center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> Step 3b. Provision it with "create"</h1>
    <p>daily storage charges apply</p>
    </div class="box">
  </div>
  </center>
`: !vms.some(vm => vm.t_stop && vm.t_stop.toDate() > Date.now()) ? html`
  <center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> Turn on a server with "+1 hour"</h1>
    <p>hourly active charges apply</p>
    </div class="box">
  </div>
  </center>
`: !vms.some(vm => vm.status == 'RUNNING') ? html`
  <center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> Wait for a server to start "RUNNING"</h1>
    </div class="box">
  </div>
  </center>
`: html `
<center>
  <div class="content">
    <div class="box has-background-light">
    <h1 class="has-text-primary"> A server is active</h1>
    <p>In multiplayer Minecraft "Add Server" using the "Server Address"</p>
    </div class="box">
  </div>
</center>
`
)}

function _serversView(selectedServer,$0,html,vms,humanizeDuration,now_s,invalidation,user,balance,api,serverModels,zones,profile,db)
{
  function select(vm) {
    if (selectedServer.name != vm.name) $0.value = vm;
  }

  return html`
    <div class="content">
    <h2>Servers</h2>
    <div class="table-container"><table class="has-background-dark table is-striped is-fullwidth is-hoverable ">
    <thead>
      <tr>
          <th>Server Address</th>
          <th>Edition</th>
          <th>Controls</th>
          <th>Time left</th>
          <th>State</th>
          <th>Type</th>
          <th>Zone</th>
          <th>Permissions</th>
      </tr>
      </thead>
      <tbody>
      ${vms.map((vm, index) => {
        if (vm.status != "UNPROVISIONED") {
          const timeLeft = () =>
            humanizeDuration(
              Math.max(0, (vm.t_stop || {}).seconds - now_s) * 1000,
              { units: ["m"], round: true }
            );
          const ticker = setInterval(() => {
            document.getElementById(`t_left_${vm.name}`).innerHTML = timeLeft();
          }, 1000);
          invalidation.then(() => clearInterval(ticker));
          // Display setup server
          return html.fragment`
            <tr class="${vm.name == selectedServer.name ? "is-selected" : null}"
                onclick=${() => select(vm)} >
              <td>${
                vm.status == "PROVISIONING"
                  ? html`<progress class="progress is-small is-primary"/>`
                  : vm.ip
              }</td>
              <td>${vm.edition || "Java"}</td>
              <td>
                <div class="buttons">
                  ${
                    ["OWNER", "ADMIN"].includes(vm.users[user.uid])
                      ? html`
                    <button class="button is-small is-warning"
                            disabled=${balance["EUR"] <= 0}
                            onclick=${() =>
                              api.topup_secs(vm, 60 * 60)}>+1 hour</button>
                  `
                      : null
                  }
                  ${
                    vm.users[user.uid] == "OWNER"
                      ? html`
                    <button class="button is-small is-danger"
                            onclick=${() => api.delete(vm)}>delete</button>
                  `
                      : null
                  }
                </div>
              </td>
              <td id="t_left_${vm.name}">${timeLeft()}</td>
              <td>${vm.status}</td>
              <td>${
                (serverModels.find((m) => m.id == vm.model) || {}).displayName
              }</td>
              <td>${vm.zone}</td>
              <td>${vm.users[user.uid]}</td>
            </tr>
            `;
        } else {
          // Modifying unprovisioned server
          return html.fragment`
            <tr class="${vm.name == selectedServer.name ? "is-selected" : null}"
                onclick=${() => select(vm)} >
              <td>TBD</td>
              <td><div class="select">
                <select onchange=${(evt) =>
                  api.setEdition(vm, evt.target.value)}>
                  ${["Java", "Bedrock"].map(
                    (edition, index) =>
                      html`<option value="${edition}"
                            selected=${
                              edition === vm.edition ? "selected" : null
                            }>
                            ${edition}
                           </option>`
                  )}
                </select>
              </div></td>
              <td>
                <span>
                  <button class="button is-small is-warning"
                          onclick=${() => api.provision(vm)}>create</button>
                  <button class="button is-small is-danger"
                          onclick=${() =>
                            api.cancelprovision(vm)}>cancel</button>
                </span>
              </td>
              <td>N/A</td>
              <td>${vm.status}</td>
              <td><div class="select">
                <select onchange=${(evt) => api.setModel(vm, evt.target.value)}>
                  ${serverModels.map(
                    (model, index) =>
                      html`<option value="${model.id}"
                            selected=${
                              model.id === vm.model ? "selected" : null
                            }>
                            ${model.displayName}
                           </option>`
                  )}
                </select>
              </div></td>
              <td><div class="select">
                <select onchange=${(evt) => api.setZone(vm, evt.target.value)}>
                  ${zones.map(
                    (zone, index) =>
                      html`<option value="${zone.id}"
                            selected=${zone.id === vm.zone ? "selected" : null}>
                            ${zone.displayName}
                           </option>`
                  )}
                </select>
              </div></td>
              <td>${vm.users[user.uid]}</td>
            </tr>
            `;
        }
      })}
    </tbody>
    </table></div>
    ${
      vms.filter((vm) => vm.status == "UNPROVISIONED").length == 0
        ? html`
    <center>
      <div>
        <label class="checkbox">
          <input type="checkbox"
                 checked=${profile.eula === true}
                 onchange=${(evt) =>
                   db
                     .collection("users")
                     .doc(user.uid)
                     .set({ eula: evt.target.checked }, { merge: true })}>
          I have read and agreed to Microsoft's <a href=${"https://account.mojang.com/documents/minecraft_eula"}>EULA</A>
        </label>
      </div>
      <div>
        <button class="button is-primary"
                disabled=${profile.eula !== true}
                onclick=${() => api.new()}>create new server</button>
      </div>
    </center>`
        : null
    }
    </div>
    
    `;
}


function _serverUsersView(currentServer,md,api,pageURL,copy,html,user,currentServerUsernamesById)
{
  if (currentServer === undefined) return md``;
  async function inviteLink() {
    const inviteId = await api.createInvite({
      zone: currentServer.zone,
      name: currentServer.name,
      role: document.getElementById("inviteRole").value
    });
    const link = pageURL + '?invite=' + inviteId; 
    copy(link)
    document.getElementById("inviteBtn").innerHTML = 'copied!';
    document.getElementById("inviteLink").setAttribute("value", link);
  }
  return html`
    <div class="content">
      <h1>Users for ${currentServer.ip || 'TBD'}  </h1>

    ${
        ["OWNER", "ADMIN"].includes(currentServer.users[user.uid]) ? html`
        Visibility
        <select class="select"
                name="model"
                onchange=${(evt) => api.setParams(currentServer,
                                                  currentServer.model,
                                                  currentServer.params,
                                                  evt.target.value,
                                                  currentServer.edition)}>
          <option selected=${currentServer.model === "private"?'selected':null}>
            public
          </option>
          <option selected=${currentServer.visibility == "private"?'selected':null}>
            private
          </option>
        </select>`:null
      }
      <p> Server is ${currentServer.visibility}, ${currentServer.visibility === "private"
            ? "only the users here can join"
            : "anybody with IP address can join"}.
        Admin and Owner are Minecraft operators.
      </p>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>role</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          ${Object.keys(currentServer.users).map(userId => html.fragment`
            <tr>
              <td>${currentServerUsernamesById[userId]}</td>
              <td>${currentServer.users[userId]}</td>
              <td>actions</td>
            </tr>
          `)}
        </tbody>
      </table>
      ${
        ["OWNER", "ADMIN"].includes(currentServer.users[user.uid]) && currentServer.ip ? html`
        <div class="field has-addons ">
          <div class="control">
          </div>
          <div class="control">
            <button id="inviteBtn" class="button" onclick=${inviteLink}>create invite</button>
          </div>
          <div class="select">
            <select id="inviteRole">
              <option>PLAYER</option>
              <option>ADMIN</option>
            </select>
          </div>
          <div class="control">
            <input id="inviteLink" class="input" type="text" readonly>
          </div>
        </div>
    `:null}       
  `
}


function _newServerParameters(currentServer,md,html,serverModelsById,serverModels,user,$0,selectedServer,formWithSubmit2)
{
  if (currentServer === undefined) return md``;
  var rows = 0;
  function row(key, value) {
    const n = rows++;
    return html`
    <div class="field has-addons" id="param-${n}">
      <div class="control">
        <input class="input" type="text" placeholder="Key" name="param-${n}-key" value=${key}>
      </div>
      <div class="control">
        <input class="input" type="text" placeholder="Value" name="param-${n}-value" value=${value}>
      </div>
      <div class="control">
        <button class="button is-warning" onclick=${() => {
          document.getElementById(`param-${n}`).remove();
        }}>
          X
        </button>
      </div>
    </div>`;
  }
  function hasChanged() {
    const button = document.getElementById("updateServer");
    if (button) button.style.visibility = "visible";
  }
  function updateServerTypeDetails(model) {
    const container = document.getElementById("serverTypeDetails");
    container.innerHTML = "";
    container.appendChild(serverTypeDetailsTable(model));
  }
  function serverTypeDetailsTable(model) {
    const serverDetails = serverModelsById[model];
    return html`<center><div class="box" style="width:80%;">
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Server RAM</td>
            <td>${serverDetails.MEMORY}</td>
          </tr>
          <tr>
            <td>Server vCPUs</td>
            <td>${serverDetails.machine_type}</td>
          </tr>
          <tr>
            <td>Price per hour when running</td>
            <td>${serverDetails.active_price_per_hour}</td>
          </tr>
          <tr>
            <td>Price per day for storage</td>
            <td>${serverDetails.storage_price_per_day}</td>
          </tr>
        </tbody>
      </table></div></center>`;
  }
  const dom = html`<form>
    <div class="content">
      <h2>Parameters for ${currentServer.ip || "TBD"}</h2>
      <div class="control">
        <label>Minecraft edition</label>
        <select class="select"
                name="edition">
          ${["Java", "Bedrock"].map(
            (edition, index) =>
              html`<option value="${edition}""
                    selected=${
                      edition === currentServer.edition ? "selected" : null
                    }>
                    ${edition} ${
                edition === "Bedrock" ? "(Phone and consoles)" : "(PC and Mac)"
              }
                 </option>`
          )}
        </select>
        See <a href="https://www.polygon.com/2020/6/15/21287920/minecraft-version-bedrock-java-edition-which-version" target="_blank">choosing the right edition</a> 
      </div>
      <div class="control">
        <label>Machine type</label>
        <select class="select"
                name="model"
                onchange=${(evt) => updateServerTypeDetails(evt.target.value)}>
          ${serverModels.map(
            (model, index) =>
              html`<option value="${model.id}""
                    selected=${
                      model.id === currentServer.model ? "selected" : null
                    }>
                    ${model.displayName}
                 </option>`
          )}
        </select>
      </div>
      <br>
      <div id="serverTypeDetails">
        ${serverTypeDetailsTable(currentServer.model)}
      </div>
      <br>
      <p>For more information on the availible environment parameters, check out the <a href="https://docs.google.com/document/d/106Cd-blwmgX_v9YI61ReA83MZdL6ex9B8W_mfJi3FtY/edit#bookmark=id.gah5h6ryjcvq" target="_blank">server documentation</a></p>
    </div>
    <center class="content">
    <div style="width:80%;" class="box">
      <h2 >Environment parameters</h2>
      ${Object.keys(currentServer.params || {})
        .sort()
        .map((key) => row(key, currentServer.params[key]))}
      <div id="lastrow"></div>
      <br>
      ${
        ["OWNER"].includes(currentServer.users[user.uid])
          ? html.fragment`
          <div class="control">
            <button class="button is-dark is-right" onclick=${() => {
              document
                .getElementById("lastrow")
                .insertAdjacentElement("beforebegin", row());
            }}>Add environment key-value</button>
          </div>   
          <br>
       </div>`
          : null
      }
    </div></center>

    ${
      ["OWNER"].includes(currentServer.users[user.uid])
        ? html`<center id="updateServer" style=${{ visibility: "hidden" }}>
        <br>
        <input id="updateServer" 
               class="button is-primary"
               type="submit"
               value="Update server parameters">
        <input class="button is-warning"
               onclick=${() => ($0.value = selectedServer)}
               value="Cancel">
        </center>
      `
        : null
    }
  </form>`;
  dom.addEventListener("input", hasChanged);
  return formWithSubmit2(dom);
}


function _11(htl){return(
htl.html`<style>
  td {
    color: white
  }
</style>`
)}

function _logs(currentServer,html,serverLogsState,api,invalidation)
{
  if (currentServer === undefined || currentServer.status === 'UNPROVISIONED') return html` `;
  const lookbackMins = 60;
  var logsState = serverLogsState[currentServer.name];
  if (logsState === undefined) {
    const begin = new Date(); begin.setMinutes(begin.getMinutes() - lookbackMins);
    serverLogsState[currentServer.name] = {
      begin: begin,
      nextPageToken: undefined,
      entries: [],
    }
    logsState = serverLogsState[currentServer.name];
  }
  
  async function moreLogs() {
    if (logsState.nextPageToken === undefined && !logsState.begin) {
      logsState.begin = new Date(); logsState.begin.setMinutes(logsState.begin.getMinutes() - lookbackMins);
    }
    const request = {
      filter: `timestamp > "${logsState.begin.toISOString()}"`,
      pageToken: logsState.nextPageToken
    };
    const response = await api.logs(currentServer, request);
    
    logsState.entries = logsState.entries.concat(response.entries);
    logsState.nextPageToken = response.nextPageToken;
    if (!logsState.nextPageToken && logsState.entries.length > 0) {
      const lastEntry = logsState.entries[logsState.entries.length - 1];
      logsState.begin = new Date(0)
      logsState.begin.setUTCSeconds(lastEntry.timestamp.seconds);
      logsState.begin.setMilliseconds(lastEntry.timestamp.nanos * 0.000001 + 1);
      console.log(lastEntry, `Next ${logsState.begin.toISOString()}`)
    }
    
    
    const logs = displayLogs(response.entries);
    const logsContainer = document.getElementById("visibleLogs");
    logsContainer.appendChild(logs);
    if (logsState.nextPageToken) {
      moreLogs();
    } else {
      const nextPoll = setTimeout(moreLogs,10000);
      invalidation.then(() => clearTimeout(nextPoll));
    }
  }
  
  function displayLogs(entries) {
    return html.fragment`${entries.map(entry => 
          html.fragment`
          <tr>
            <td>
            ${entry.message.stringValue}
            </td>
          </tr>`
        )}`;
  }
  
  moreLogs();
  return html`
    <div class="content">
      <h2> Server logs </h2>
    </div>
    <div class="table-container" style=${{"overflow-y": "auto", "max-height": "400px"}}>
    <table class="table is-narrow is-fullwidth">
      <thead>
      </thead>
      <tbody class="is-family-monospace has-text-white has-background-dark" id="visibleLogs">
        ${displayLogs(logsState.entries)}
      </tbody>
    </table>
    </div>
  `
}


function _13(html,md){return(
html`<div class="content">
${md`
### Development Roadmap
  - Add Storage charges
  - More regions
  - Remove players from server userlist
  - Improve UX of server logs
  - Improve invite link
  - Private settings for bedrock probably doesn't work
  - Faster feedback when topping up server
`}
</div>`
)}

async function _updatedParams(newServerParameters,api,selectedServer)
{
  if (newServerParameters !== undefined){
    const model = newServerParameters.model;
    const edition = newServerParameters.edition;
    console.log("Saving parameters");
    const sanatizedNewParams = {}
    function sanatize(keyOrValue) {
      return keyOrValue.replace(/^param-\d+/,'')
    }
    const keys = {};
    const values = {};
    
    Object.keys(newServerParameters).map(key => {
      const key_id = (key.match(/^param-(\d+)-key/) || [])[1];
      const value_id = (key.match(/^param-(\d+)-value/) || [])[1];
      if (key_id) keys[key_id] = newServerParameters[key];
      if (value_id) values[value_id] = newServerParameters[key];
    });
    
    const params = {};
    Object.keys(keys).map(idx => {
      if (keys[idx] && keys[idx].length >= 1) params[keys[idx]] = values[idx];
    });
    await api.setParams(selectedServer, model, params, selectedServer.visibility, edition);
    return {model, params};
  }
}


function _currentServer(DocView,db,selectedServer,user){return(
new DocView(db.collection("VMs").doc(
  selectedServer.name == user.uid ? selectedServer.name : `${selectedServer.zone}|${selectedServer.name}`))
)}

async function _currentServerUsernamesById(currentServer,db)
{
  if (currentServer === undefined) return {}
  const usernames = await Promise.all(Object.keys(currentServer.users).map(
    uid => db.collection("usernames").doc(uid).get().then(doc => ({name: (doc.data() || {}).name, uid: uid}))
  ))
  return usernames.reduce(
    (index, entry) => Object.defineProperty(index, entry.uid, {value: entry.name, enumerable: true}),
    {}
  )
}


function _message(){return(
""
)}

function _api(firebase,$0,user,db,$1,stripe,pageURL)
{
  async function backend(payload, options) {
    options = options || {};
    if (!options.silent) console.log(payload);
    const result = await firebase
      .functions("europe-west1")
      .httpsCallable("api")(payload);
    if (!options.silent)
      $0.value = { request: payload, response: result };
    return result;
  }
  return {
    topup_secs: async (vm, secs) =>
      await backend({
        op: "vmTopup",
        zone: vm.zone,
        name: vm.name,
        secs: secs
      }),
    /*delete: async vm =>
      await db
        .collection("VMs")
        .doc(`${vm.zone}|${vm.name}`)
        .delete()*/
    logs: async (vm, params) =>
      (await backend({
        op: "vmLogs",
        zone: vm.zone,
        name: vm.name,
        params
      })).data,
    createInvite: async params =>
      (await backend({
        op: "createInvite",
        params
      })).data,
    processInvite: async (id, params) =>
      (await backend({
        op: "processInvite",
        id,
        params
      })).data,
    poll: async vm =>
      await backend(
        {
          op: "vmPoll",
          zone: vm.zone,
          name: vm.name
        },
        { silent: true }
      ),
    provision: async vm =>
      await backend({
        op: "vmProvision",
        id: user.uid
      }),
    setParams: async (vm, model, params, visibility, edition) => {
      console.log(vm, model, params, visibility, edition);
      const key = vm.name === user.uid ? vm.name : `${vm.zone}|${vm.name}`;
      return await db
        .collection("VMs")
        .doc(key)
        .update({
          model,
          params: params || {},
          visibility: visibility || "public",
          edition
        });
    },
    new: async () => {
      const newVm = {
        name: user.uid,
        status: "UNPROVISIONED",
        model: "f1",
        zone: "europe-west3-a",
        params: {},
        users: {
          [user.uid]: "OWNER"
        }
      };
      await db
        .collection("VMs")
        .doc(user.uid)
        .set(newVm);
      $1.value = newVm;
    },
    cancelprovision: async () =>
      db
        .collection("VMs")
        .doc(user.uid)
        .delete(),
    setModel: async (vm, model) =>
      db
        .collection("VMs")
        .doc(user.uid)
        .update({ model: model }),
    setEdition: async (vm, edition) =>
      db
        .collection("VMs")
        .doc(user.uid)
        .update({ edition: edition }),
    setZone: async (vm, zone) =>
      db
        .collection("VMs")
        .doc(user.uid)
        .update({ zone: zone }),
    claim: async (id, voucher) =>
      db
        .collection("users")
        .doc(user.uid)
        .collection("transactions")
        .doc(id)
        .set(voucher),
    buy: async price =>
      stripe.redirectToCheckout({
        lineItems: [{ price: price, quantity: 1 }],
        mode: 'payment',
        successUrl: `${pageURL}?success`,
        cancelUrl: `${pageURL}?cancel`,
        clientReferenceId: user.uid,
        customerEmail: user.email
      })
  };
}


function _serverLogsState(){return(
{
  
}
)}

function _db(firebase){return(
firebase.firestore()
)}

function _profile(DocView,db,user){return(
new DocView(db.collection("users").doc(user.uid), {})
)}

function _transactions(DocsView,db,user){return(
new DocsView(db.collection("users").doc(user.uid).collection("transactions"))
)}

function _serverModels(DocsView,db){return(
new DocsView(db.collection("serverModels"))
)}

function _serverModelsById(serverModels){return(
serverModels.reduce(
  (index, model) => Object.defineProperty(index, model.id, {value: model, enumerable: true}),
  {}
)
)}

function _zones(DocsView,db){return(
new DocsView(db.collection("zones"))
)}

function _vms(DocsView,db,user){return(
new DocsView(db.collection("VMs").where(`users.${(user || {}).uid}`, '!=', null))
)}

async function _invite(pageParams,db){return(
pageParams.invite ? (await db.collection("invites").doc(pageParams.invite).get()).data() : undefined
)}

function _vmsCopy(){return(
[]
)}

function _vmsCopier($0,vms)
{
  $0.value = vms
}


function _userCopy(){return(
null
)}

function _userCopier($0,user)
{
  $0.value = user
}


function _username(DocView,db,user){return(
new DocView(db.collection("usernames").doc(user.uid))
)}

function _username_initializer(username,db,user,names)
{
  if (username === undefined) {
    db.collection("usernames").doc(user.uid).set({
      name: names.uniqueNamesGenerator({
        dictionaries: [names.adjectives, names.colors, names.animals],
        separator: ' ',
      }, {merge: true})
    })
  }
}


function _balance(transactions){return(
transactions.reduce(
  (bal, tx) => {
    bal[tx.currency] = (bal[tx.currency] || 0) + tx.amount
    return bal
  },
  {}
)
)}

function _onLogin(firebase,db,user)
{
  if (firebase.auth().currentUser) {
    db.collection("users")
      .doc(user.uid)
      .update({
        login: firebase.firebase_.firestore.FieldValue.serverTimestamp()
      });
  }
}


function _selectedServer(){return(
{}
)}

function _37(currentServer){return(
currentServer
)}

function* _poll_state(vms,user,api,Promises)
{
  yield;
  while (true) {
    vms.forEach(vm => {
      if (vm.name != user.uid) api.poll(vm)
    });
    yield Promises.delay(10000);
  }
}


function _39(firebase){return(
firebase.SDK_VERSION
)}

function* _now_s(Promises)
{ 
  yield Math.floor(Date.now()/1000);
  while (true) {
    yield Promises.delay(30000, Math.floor(Date.now()/1000 + 30));
  }
}


function _pageURL(html){return(
html`<a href>`.href.match(/^([^?]*)/)[0]
)}

function _pageParams(URLSearchParams,location){return(
Object.fromEntries(new URLSearchParams(location.search).entries())
)}

function _stripe(Stripe,STRIPE_API_KEY){return(
Stripe(STRIPE_API_KEY)
)}

function _firebaseConfig(){return(
{
  // See https://console.firebase.google.com/u/0/project/_/settings/general/web
  name: "minecraft",
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  databaseURL: "https://endpointservice.firebaseio.com",
  projectId: "endpointservice",
  storageBucket: "endpointservice.appspot.com",
  appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
  uiConfig: {
    signInOptions: ["google.com", "facebook.com", "phone" /*"password", */]
  }
}
)}

function _STRIPE_API_KEY(){return(
"pk_live_51HbQzcHGNosi6Ft0JM18AKCtG3cIs707E1ft1B5ePvpptHb5yoLnXHXLWkyBbDjHgtlPMOT0233jrcfvWAGj6AYp00RxIZdaky"
)}

function _names(){return(
import('https://unpkg.com/unique-names-generator@4.3.1/dist/index.m.js?module')
)}

function _formWithSubmit2(html,formValue){return(
(form) => {
  const container = html`<div>${form}`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    container.value = formValue(form);
    container.dispatchEvent(new CustomEvent("input"));
  });
  form.addEventListener("input", (event) => {
    event.preventDefault();
    // Need this, because otherwise the viewof Generator catches bubbling input events
    event.stopPropagation();
  });
  return container;
}
)}

function _humanizeDuration(require){return(
require("humanize-duration")
)}

function _newUserBonus(firebase){return(
{
  amount: 1,
  currency: 'EUR',
  type: "NEW_USER",
  date: firebase.firebase_.firestore.FieldValue.serverTimestamp()
}
)}

function _style(html){return(
html`<style>

.katex-display,p,h1,h2,h3,table,li
{
  max-width: 100%;
}

</style>`
)}

function _58(futurice_profile_bulma){return(
futurice_profile_bulma
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["minecraft.jpg", {url: new URL("./files/43d84b00f81f55c58e9a2558784e0ca8843bd69299ff5569773aea0befca6141e47e4ab514359274013d995032ca413d47449d1c7a04f3c508e44116b0c001d3.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("header")).define("header", ["html","FileAttachment"], _header);
  main.variable(observer("invites")).define("invites", ["firebase","invite","vmsCopy","html","api","pageParams"], _invites);
  main.variable(observer("signupPrompt")).define("signupPrompt", ["userCopy","html"], _signupPrompt);
  main.variable(observer("signin")).define("signin", ["viewof user"], _signin);
  main.variable(observer("bonus")).define("bonus", ["transactions","html","newUserBonus"], _bonus);
  main.variable(observer("profileView")).define("profileView", ["db","user","html","username","balance","transactions","api","newUserBonus"], _profileView);
  main.variable(observer("tutorial")).define("tutorial", ["vms","html"], _tutorial);
  main.variable(observer("serversView")).define("serversView", ["selectedServer","mutable selectedServer","html","vms","humanizeDuration","now_s","invalidation","user","balance","api","serverModels","zones","profile","db"], _serversView);
  main.variable(observer("serverUsersView")).define("serverUsersView", ["currentServer","md","api","pageURL","copy","html","user","currentServerUsernamesById"], _serverUsersView);
  main.variable(observer("viewof newServerParameters")).define("viewof newServerParameters", ["currentServer","md","html","serverModelsById","serverModels","user","mutable selectedServer","selectedServer","formWithSubmit2"], _newServerParameters);
  main.variable(observer("newServerParameters")).define("newServerParameters", ["Generators", "viewof newServerParameters"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _11);
  main.variable(observer("viewof logs")).define("viewof logs", ["currentServer","html","serverLogsState","api","invalidation"], _logs);
  main.variable(observer("logs")).define("logs", ["Generators", "viewof logs"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","md"], _13);
  main.variable(observer("updatedParams")).define("updatedParams", ["newServerParameters","api","selectedServer"], _updatedParams);
  main.variable(observer("viewof currentServer")).define("viewof currentServer", ["DocView","db","selectedServer","user"], _currentServer);
  main.variable(observer("currentServer")).define("currentServer", ["Generators", "viewof currentServer"], (G, _) => G.input(_));
  main.variable(observer("currentServerUsernamesById")).define("currentServerUsernamesById", ["currentServer","db"], _currentServerUsernamesById);
  main.define("initial message", _message);
  main.variable(observer("mutable message")).define("mutable message", ["Mutable", "initial message"], (M, _) => new M(_));
  main.variable(observer("message")).define("message", ["mutable message"], _ => _.generator);
  main.variable(observer("api")).define("api", ["firebase","mutable message","user","db","mutable selectedServer","stripe","pageURL"], _api);
  main.variable(observer("serverLogsState")).define("serverLogsState", _serverLogsState);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer("viewof profile")).define("viewof profile", ["DocView","db","user"], _profile);
  main.variable(observer("profile")).define("profile", ["Generators", "viewof profile"], (G, _) => G.input(_));
  main.variable(observer("viewof transactions")).define("viewof transactions", ["DocsView","db","user"], _transactions);
  main.variable(observer("transactions")).define("transactions", ["Generators", "viewof transactions"], (G, _) => G.input(_));
  main.variable(observer("viewof serverModels")).define("viewof serverModels", ["DocsView","db"], _serverModels);
  main.variable(observer("serverModels")).define("serverModels", ["Generators", "viewof serverModels"], (G, _) => G.input(_));
  main.variable(observer("serverModelsById")).define("serverModelsById", ["serverModels"], _serverModelsById);
  main.variable(observer("viewof zones")).define("viewof zones", ["DocsView","db"], _zones);
  main.variable(observer("zones")).define("zones", ["Generators", "viewof zones"], (G, _) => G.input(_));
  main.variable(observer("viewof vms")).define("viewof vms", ["DocsView","db","user"], _vms);
  main.variable(observer("vms")).define("vms", ["Generators", "viewof vms"], (G, _) => G.input(_));
  main.variable(observer("invite")).define("invite", ["pageParams","db"], _invite);
  main.define("initial vmsCopy", _vmsCopy);
  main.variable(observer("mutable vmsCopy")).define("mutable vmsCopy", ["Mutable", "initial vmsCopy"], (M, _) => new M(_));
  main.variable(observer("vmsCopy")).define("vmsCopy", ["mutable vmsCopy"], _ => _.generator);
  main.variable(observer("vmsCopier")).define("vmsCopier", ["mutable vmsCopy","vms"], _vmsCopier);
  main.define("initial userCopy", _userCopy);
  main.variable(observer("mutable userCopy")).define("mutable userCopy", ["Mutable", "initial userCopy"], (M, _) => new M(_));
  main.variable(observer("userCopy")).define("userCopy", ["mutable userCopy"], _ => _.generator);
  main.variable(observer("userCopier")).define("userCopier", ["mutable userCopy","user"], _userCopier);
  main.variable(observer("viewof username")).define("viewof username", ["DocView","db","user"], _username);
  main.variable(observer("username")).define("username", ["Generators", "viewof username"], (G, _) => G.input(_));
  main.variable(observer("username_initializer")).define("username_initializer", ["username","db","user","names"], _username_initializer);
  main.variable(observer("balance")).define("balance", ["transactions"], _balance);
  main.variable(observer("onLogin")).define("onLogin", ["firebase","db","user"], _onLogin);
  main.define("initial selectedServer", _selectedServer);
  main.variable(observer("mutable selectedServer")).define("mutable selectedServer", ["Mutable", "initial selectedServer"], (M, _) => new M(_));
  main.variable(observer("selectedServer")).define("selectedServer", ["mutable selectedServer"], _ => _.generator);
  main.variable(observer()).define(["currentServer"], _37);
  main.variable(observer("poll_state")).define("poll_state", ["vms","user","api","Promises"], _poll_state);
  main.variable(observer()).define(["firebase"], _39);
  main.variable(observer("now_s")).define("now_s", ["Promises"], _now_s);
  main.variable(observer("pageURL")).define("pageURL", ["html"], _pageURL);
  main.variable(observer("pageParams")).define("pageParams", ["URLSearchParams","location"], _pageParams);
  main.variable(observer("stripe")).define("stripe", ["Stripe","STRIPE_API_KEY"], _stripe);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("STRIPE_API_KEY")).define("STRIPE_API_KEY", _STRIPE_API_KEY);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("firebase", child1);
  main.import("DocView", child1);
  main.import("DocsView", child1);
  const child2 = runtime.module(define2);
  main.import("render", child2);
  main.import("component", child2);
  main.import("jsx", child2);
  main.import("memo", child2);
  main.import("forwardRef", child2);
  main.import("React", child2);
  main.import("ReactDOM", child2);
  main.import("createElement", child2);
  main.import("Children", child2);
  main.import("createRef", child2);
  main.import("createContext", child2);
  main.import("lazy", child2);
  main.import("Fragment", child2);
  main.import("StrictMode", child2);
  main.import("Suspense", child2);
  main.import("cloneElement", child2);
  main.import("useCallback", child2);
  main.import("useContext", child2);
  main.import("useEffect", child2);
  main.import("useImperativeHandle", child2);
  main.import("useLayoutEffect", child2);
  main.import("useMemo", child2);
  main.import("useReducer", child2);
  main.import("useRef", child2);
  main.import("useState", child2);
  main.variable(observer("names")).define("names", _names);
  const child3 = runtime.module(define3);
  main.import("html", child3);
  main.variable(observer("formWithSubmit2")).define("formWithSubmit2", ["html","formValue"], _formWithSubmit2);
  const child4 = runtime.module(define4);
  main.import("formValue", child4);
  const child5 = runtime.module(define5);
  main.import("copy", child5);
  const child6 = runtime.module(define6);
  main.import("Stripe", child6);
  main.variable(observer("humanizeDuration")).define("humanizeDuration", ["require"], _humanizeDuration);
  main.variable(observer("newUserBonus")).define("newUserBonus", ["firebase"], _newUserBonus);
  main.variable(observer("style")).define("style", ["html"], _style);
  const child7 = runtime.module(define7);
  main.import("futurice_profile_bulma", child7);
  main.variable(observer()).define(["futurice_profile_bulma"], _58);
  return main;
}
