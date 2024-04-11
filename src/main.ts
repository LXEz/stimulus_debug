import { Application } from "./../stimulus/core/application";
import { FatherComponent } from "./controller/FatherComponent";
import { Son1 } from "./controller/Son1";
import { Son2 } from "./controller/Son2";

import { Demo } from "./controller/demo";
export * from "./../stimulus/core/application";
const application = Application.start();

console.log(2222);

application.register("demo", Demo);
application.register("father", FatherComponent);
application.register("son1", Son1);
application.register("son2", Son2);
window.Application = application;
