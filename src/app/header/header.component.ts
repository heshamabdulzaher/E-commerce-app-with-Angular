import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { SharingDataService } from "../services/sharing-data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  cartLength;
  queryWord = "";
  user: boolean = false;
  firstChar = "";
  constructor(
    private productService: ProductsService,
    private sharingDataService: SharingDataService
  ) {}

  ngOnInit() {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem("userCart"));
    this.sharingDataService.cartAsObservable.subscribe(cart => {
      if (cart) {
        this.cartLength = cart;
      } else {
        this.cartLength = cartFromLocalStorage
          ? (this.cartLength = cartFromLocalStorage.items.length)
          : 0;
      }
    });
    this.sharingDataService.userAsObservable.subscribe(data => {
      this.user = data;
      if (data) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.firstChar = user.name.charAt(0);
      }
    });
  }

  getTheQuery(e) {
    this.sharingDataService.getQueryWord(e);
  }
}
