import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registeration-from",
  templateUrl: "./registeration-from.component.html",
  styleUrls: ["./registeration-from.component.css"]
})
export class RegisterationFromComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  onSubmit(loginForm) {
    console.log("hi");
    console.log(loginForm);
  }
}
