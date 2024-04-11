import { Controller } from "../../stimulus/core/controller";

export class Son1 extends Controller {
  connect(): void {
    this.element.innerHTML = "我是son111";
  }
}
