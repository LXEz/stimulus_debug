import { Controller } from "../../stimulus/core/controller";

export class Son1 extends Controller {
  connect(): void {
    this.element.innerHTML = `
    <div class="bg-orange-100 ">我是son1组件</div>
    
    `;
  }
}
