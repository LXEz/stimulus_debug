import { ValueDefinitionMap } from "../../stimulus/core/value_properties";
import { Controller } from "./../../stimulus/core/controller";

export class Demo extends Controller {
  [x: string]: any;
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

  static slots: string[] = ["slot1", "slot2"];
  connect(): void {
    console.log(this.slot1);
  }
  clickHandle() {
    console.log(111);
    this.dispatch("putDataToMenu", { detail: { id: 1231 } });
  }

  getHeaderData() {
    console.log("getHeaderData");
  }
}
