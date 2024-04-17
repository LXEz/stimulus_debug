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
    this.render();
  }

  render() {
    const container = (slot1: string, slot2: string) => `
    <div id="fContainer" class="mb-[10px] bg-orange-200 border">
        <div  class="flex w-f justify-center border-b-[1px] m-3">我是father组件</div>
        <div id="fa:body" class="flex">
            <div id="fa:slot1" class="mx-3 bg-orange-300 p-2">
              <div class="border-b-[1px] mb-4 ">#slot1</div>

              <div>${slot1} </div>             
            </div>
            <div id="fa:slot2" class="mx-3 bg-orange-300 p-2">
              <div class="border-b-[1px] mb-4 " >#slot2</div>
              <div> ${slot2}</div>
            </div>
        </div>  
      </div>
  
    </div>`;

    this.element.innerHTML = container(this.slot1.element, this.slot2.element);
  }

  tt() {
    alert("点击了父组件");
  }
}
