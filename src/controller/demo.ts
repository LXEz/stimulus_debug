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
    console.log(this.defaultSlots);
    this.render();
    // this.element.innerHTML = `

    // <div >我是demo组件---${this.defaultSlots.element}</div>

    // `;

    // this.element.innerHTML = this.defaultSlots.element;
  }

  render() {
    const container = (defaultSlots: string) => `
  
        <div class="bg-orange-400 w-full">我是demo组件---${defaultSlots}</div>
        
        `;

    this.element.innerHTML = container(this.defaultSlots.element);
  }
  handleDefaultSlots() {
    this.element.innerHTML = this.defaultSlots.element.reduce(
      (pre: string, cur: string) => pre + cur,
      ""
    );
  }
  clickHandle() {
    console.log(111);
    this.dispatch("putDataToMenu", { detail: { id: 1231 } });
  }

  getHeaderData() {
    console.log("getHeaderData");
  }
}
