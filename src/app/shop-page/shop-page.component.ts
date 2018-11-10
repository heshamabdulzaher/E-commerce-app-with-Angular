import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { SharingDataService } from "../services/sharing-data.service";

@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.css"]
})
export class ShopPageComponent implements OnInit {
  showFormsToUser: boolean = false;
  showRegisterForm: boolean = false;
  constructor(
    private productService: ProductsService,
    private sharingDataService: SharingDataService
  ) {}
  ngOnInit() {
    this.openModal();
  }

  goToTheOtherForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }
  openModal() {
    this.sharingDataService.modalAsObservable.subscribe(data => {
      this.showFormsToUser = data;
      if (this.showFormsToUser) {
        document.body.style.overflow = "hidden";
      }
    });
  }
  colseModal(modal, e) {
    if (e.target == modal) {
      this.sharingDataService.modalIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }
}
