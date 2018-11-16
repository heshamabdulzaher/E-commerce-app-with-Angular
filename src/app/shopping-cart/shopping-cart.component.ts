import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "../services/sharing-data.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: [
    "./shopping-cart.component.css",
    "./sm_shopping-cart.component.css"
  ]
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private sharingDataService: SharingDataService
  ) {}

  products: any = [];
  subtotalPrice = 0;
  cartOnLocalStorage = JSON.parse(localStorage.getItem("userCart")) || [];

  ngOnInit() {
    if (this.cartOnLocalStorage.length !== 0) {
      this.cartOnLocalStorage.items.map(product => (product["qty"] = 1));
      this.products = this.cartOnLocalStorage.items;
      this.reCalcTotalPrice();
      this.sharingDataService.changeStatusOfUser(true);
    }
    window.scrollTo(0, 0);
  }

  reCalcTotalPrice() {
    this.subtotalPrice = 0;
    this.products.forEach(product => {
      product["total_price"] = product.qty * product.new_price;
      this.subtotalPrice += product.total_price;
    });
    let newCart = { ...this.cartOnLocalStorage };
    localStorage.setItem("userCart", JSON.stringify(newCart));
  }

  handleQTY(e, product) {
    if (e.target.className === "plus") {
      product.qty += 1;
      product.total_price = product.qty * product.price;
    } else if (e.target.className === "minus") {
      product.qty -= 1;
      product.total_price = product.qty * product.price;
    }
    this.reCalcTotalPrice();
  }

  deleteProduct(product) {
    let newCart = { ...this.cartOnLocalStorage };
    newCart.items.splice(this.products.indexOf(product), 1);

    // PATCH the db cart
    this.cartService.updatingMyCart(newCart).subscribe(updatedCart => {
      localStorage.setItem("userCart", JSON.stringify(updatedCart));
      this.reCalcTotalPrice();
      this.sharingDataService.updataCartLengthNumber(newCart.items.length);
    });
  }
}
