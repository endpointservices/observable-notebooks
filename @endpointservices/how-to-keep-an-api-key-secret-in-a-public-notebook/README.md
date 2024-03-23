# How To Keep an API key secret in a Public Notebook

https://observablehq.com/@endpointservices/how-to-keep-an-api-key-secret-in-a-public-notebook@109

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/@endpointservices/how-to-keep-an-api-key-secret-in-a-public-notebook.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@endpointservices/how-to-keep-an-api-key-secret-in-a-public-notebook";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
