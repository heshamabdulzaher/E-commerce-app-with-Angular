import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "src/app/services/sharing-data.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  constructor(
    private sharingDataService: SharingDataService,
    private cartService: CartService
  ) {}

  PaymentFields: boolean = true;
  totalPrice: number = 0;
  totalPriceAsString: string;

  ngOnInit() {
    let cartProducts = JSON.parse(localStorage.getItem("userCart"));
    cartProducts.items.forEach(
      product => (this.totalPrice += product.total_price)
    );
    // Add comma to totalPrice after 3 digits
    this.totalPriceAsString = this.totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  togglePaymentFields() {
    this.PaymentFields = !this.PaymentFields;
  }

  resetCart() {
    // PATCH the db cart
    let cart = JSON.parse(localStorage.getItem("userCart"));
    cart.items = [];
    this.cartService.updatingMyCart(cart).subscribe(updatedCart => {
      localStorage.removeItem("userCart");
      localStorage.setItem("userCart", JSON.stringify(updatedCart));
      this.sharingDataService.updataCartLengthNumber(0);
    });
  }
}
