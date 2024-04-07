import { ValueDefinitionMap } from "../../stimulus/core/value_properties";
import { Controller } from "./../../stimulus/core/controller";

export class Demo extends Controller {
  static targets: string[] = ["jk", "io"];
  static values: ValueDefinitionMap = {
    test1: {
      type: String,
      default: "sd",
    },
    test2: {
      type: String,
      default: "sd2",
    },
  };
  connect(): void {
    console.log("sadhjakdhskj");

    this.element.innerHTML = "我是啊哈哈哈";
  }
}
