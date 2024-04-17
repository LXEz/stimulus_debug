import { Controller } from "../../stimulus/core/controller";

export class Son2 extends Controller {
  connect(): void {
    this.element.innerHTML = `
    <div class="bg-orange-100 ">我是son2组件</div>
    
    `;
  }
}
