import { Controller } from "../../stimulus/core/controller";
import { ValueDefinitionMap } from "../../stimulus/core/value_properties";

export class FatherComponent extends Controller {
  [x: string]: any;
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
    this.render();
    console.log(this.slot1, "--slo1");
  }

  render() {
    const container = (slot1: string, slot2: string) => `<div >
  
        <div >我是嵌套在父组件中的：---${slot1}</div>
        <div >我是嵌套在父组件中的：---${slot2}</div>
        </div>`;

    this.element.innerHTML = container(this.slot1.element, this.slot2.element);
  }

  tt() {
    alert("点击了父组件");
  }
}
