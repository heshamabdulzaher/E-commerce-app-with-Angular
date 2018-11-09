import { Component, OnInit, HostListener, ElementRef } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { LoginModel } from "../login-model";

@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.css"]
})
export class ShopPageComponent implements OnInit {
  showFormsToUser: boolean = false;
  showRegisterForm: boolean = false;
  constructor(private productService: ProductsService) {}
  loginModel = new LoginModel("", "");
  ngOnInit() {
    this.productService.shareDaraAsObservable.subscribe(data => {
      this.showFormsToUser = data;
      document.body.style.overflow = "hidden";
    });
    if (this.showFormsToUser) {
      console.log("hi");
    }
  }
  goToTheOtherForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }
}
