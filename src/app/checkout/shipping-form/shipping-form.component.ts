import { Component, OnInit } from "@angular/core";
import { Shipping } from "./shipping";

@Component({
  selector: "app-shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit {
  constructor() {}
  shippingModel = new Shipping("", "", "", 0, "", "", "", "");

  ngOnInit() {}
}
