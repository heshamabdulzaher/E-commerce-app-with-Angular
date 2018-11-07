import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-stpes-bar",
  templateUrl: "./stpes-bar.component.html",
  styleUrls: ["./stpes-bar.component.css"]
})
export class StpesBarComponent implements OnInit {
  steps = ["shipping", "payment", "done"];

  constructor() {}

  @Input()
  stepNumber;

  ngOnInit() {}
}
