import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.css"]
})
export class ShopPageComponent implements OnInit {
  showFormsToUser: boolean = false;
  showRegisterForm: boolean = false;
  constructor(private productService: ProductsService) {}
  ngOnInit() {
    this.openModal();
  }

  goToTheOtherForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }
  openModal() {
    this.productService.shareDaraAsObservable.subscribe(data => {
      this.showFormsToUser = data;
      if (this.showFormsToUser) {
        document.body.style.overflow = "hidden";
      }
    });
  }
  colseModal(modal, e) {
    if (e.target == modal) {
      this.productService.modalIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }
}
