import { Controller } from "../../stimulus/core/controller";
import { ValueDefinitionMap } from "../../stimulus/core/value_properties";

export class FatherComponent extends Controller {
  static slots: string[] = ["slot1", "slot2"];
  static targets: string[] = ["t1", "t2"];
  static values: ValueDefinitionMap = {
    ji: {
      type: String,
      default: "",
    },
  };
  connect(): void {
    // this.element.innerHTML = "我是父组件";
    console.log(this.slot1, "--slo1");
  }
}
