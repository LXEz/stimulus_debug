import { Controller } from "./../../stimulus/core/controller";

export class Demo extends Controller {
  static targets: string[] = ["jk", "io"];
  connect(): void {
    console.log("sadhjakdhskj");

    this.element.innerHTML = "我是啊哈哈哈";
  }
}
