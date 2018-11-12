import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  constructor() {}

  PaymentFields: boolean = true;
  totalPrice: number = 0;
  totalPriceAsString: string;
  NumberCardValue: string = "";
  ngOnInit() {
    let cartProducts = JSON.parse(localStorage.getItem("userCart"));
    console.log(cartProducts);
    cartProducts.items.forEach(product => {
      this.totalPrice += product.total_price;
    });
    // Add comma to totalPrice after 3 digits
    this.totalPriceAsString = this.totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  showPaymentFields() {
    this.PaymentFields = true;
  }
  hiddenPaymentFields() {
    this.PaymentFields = false;
  }
}
