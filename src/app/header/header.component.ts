import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  constructor() {}

  cartLength = JSON.parse(localStorage.getItem("cart_shopping")).length;
}
