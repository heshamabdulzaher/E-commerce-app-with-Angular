import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  products;
  ngOnInit() {
    this.cartService.theProductsInMyCart().subscribe(
      data => {
        console.log(data);
        this.products = data;
        this.handleDiscount(this.products);
      },
      err => {
        console.log(err);
      }
    );
  }
  handleDiscount(allProducts) {
    allProducts = allProducts.map(product => {
      product["new_price"] =
        product.price - (product.discount / 100) * product.price;
      return product;
    });
  }

  howManyOfProducts(e, number) {
    if (e.target.className === "plus") {
      number.value = parseInt(number.value) + 1;
    } else if (e.target.className === "minus") {
      number.value = parseInt(number.value) - 1;
    }
    // this.updateSubtotalValue();
  }
}
