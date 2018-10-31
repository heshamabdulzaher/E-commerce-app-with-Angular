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
    setTimeout(() => {
      this.handleSubtotalPriceValue();
    }, 300);
  }

  handleSubtotalPriceValue() {
    let pricesListOfCartProducts = document.querySelectorAll(
      ".total-price .priceNumber"
    );

    this.subtotalPrice = 0;
    pricesListOfCartProducts.forEach(price => {
      this.subtotalPrice += parseInt(price.innerHTML);
    });
  }

  howManyOfProducts(e, number) {
    if (e.target.className === "plus") {
      number.value = parseInt(number.value) + 1;
      this.handleSubtotalPriceValue();
    } else if (e.target.className === "minus") {
      number.value = parseInt(number.value) - 1;
    }
  }

  deleteProduct(product) {
    this.products.splice(this.products.indexOf(product), 1);
    localStorage.setItem("cart_shopping", JSON.stringify(this.products));
    product.in_my_cart = false;

    this.productService.changeStatusOfProduct(product.id, false).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
