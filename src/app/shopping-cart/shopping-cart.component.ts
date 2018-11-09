import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  products: any = [];
  subtotalPrice = 0;

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("cart_shopping"));
    this.products = data;
    data.forEach(product => (product["qty"] = 1));
    this.reCalcTotalPrice();
    window.scrollTo(0, 0);
  }

  reCalcTotalPrice() {
    this.subtotalPrice = 0;
    this.products.forEach(product => {
      product["total_price"] = product.qty * product.new_price;
      this.subtotalPrice += product.total_price;
    });
    console.log(this.products);
    localStorage.setItem("cart_shopping", JSON.stringify(this.products));
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
    this.productService.changeStatusOfProduct(product.id, false).subscribe(
      data => {
        this.products.splice(this.products.indexOf(product), 1);
        localStorage.setItem("cart_shopping", JSON.stringify(this.products));
        product.in_my_cart = false;
        this.reCalcTotalPrice();
        // Update cart length
        let theNewCartLengthValue = (this.productService.cartLength -= 1);
        this.productService.updataCartLengthNumber(theNewCartLengthValue);
      },
      err => {
        console.log(err);
      }
    );
  }
}
