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
  inputVal: string = "";
  ngOnInit() {
    let cartProducts = JSON.parse(localStorage.getItem("cart_shopping"));
    console.log(cartProducts);
    cartProducts.forEach(product => {
      this.totalPrice += product.total_price;
      console.log(product);
    });
    // Add comma to totalPrice after 3 digits
    this.totalPriceAsString = this.totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // Some of the attempts failed for validation
  // numberWithSpaces(x) {
  //   var parts = x.toString().split(".");
  //   parts[0] = parts[0].replace(/\B(?=(\d{4})+(?!\d))/g, " ");
  //   return parts.join(".");
  // }
  //
  // if (e.length === 4 || e.length === 9 || e.length === 14) {
  //   this.inputVal += " ";
  // }
  // document.getElementById('cardNumber').addEventListener('input', function (e) {
  //   e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  // });
  validationOfCardNumber(e) {
    if (e.length === 4 || e.length === 9 || e.length === 14) {
      this.inputVal += " ";
    }
  }
  showPaymentFields() {
    this.PaymentFields = true;
  }
  hiddenPaymentFields() {
    this.PaymentFields = false;
  }
}
