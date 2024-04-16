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
    this.render();
  }

  render() {
    const container = (defaultSlots: string, slot1: String) => `
  
      <div class="bg-orange-500 w-full h-[500px]">
      
        <div id="demo:title">
          <div  class="flex justify-center border-b-[1px] ">我是demo组件</div>
        </div>
        <div id="demo:body" class="flex mt-[10px]">
            <div id="demo:slot1" class="w-[50%] border mt-[10px] h-[300px] bg-orange-400">
                <div  class="flex justify-center border-b-[1px] ">#slot1</div>

                <div id="" class="flex items-center justify-center mt-[30px]"> ${slot1}</div>
            </div>
            <div id="demo:defaultSlot" class="w-[50%] border mt-[10px] h-[300px] bg-orange-400">
                <div  class="flex justify-center border-b-[1px] ">#defaultSlot</div>

                <div id="" class="flex items-center justify-center mt-[30px]"> ${defaultSlots}</div>
            
            </div>
        </div>
      </div>
      
        `;

    this.element.innerHTML = container(
      this.defaultSlots.element,
      this.slot1.element
    );
  }
}
