import { Application } from "./../stimulus/core/application";

import { Demo } from "./controller/demo";

const application = Application.start();

console.log(2222);

application.register("demo", Demo);
