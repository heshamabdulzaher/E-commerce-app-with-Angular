import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.addEventListener("scroll", function(e) {
      const header = document.querySelector("header");
      if (this.scrollY > 80) {
        header.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.15)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }
}
