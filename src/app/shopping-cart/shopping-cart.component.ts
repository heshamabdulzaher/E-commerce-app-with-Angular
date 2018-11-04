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
    data.forEach(product => {
      product["qty"] = 1;
      product["total_price"] = product.qty * product.new_price;
      this.subtotalPrice += product.total_price;
    });
    this.products = data;
  }

  handleQTY(e, product) {
    console.log(this.products);

    if (e.target.className === "plus") {
      product.qty += 1;
      product.total_price = product.qty * product.price;
    } else if (e.target.className === "minus") {
      product.qty -= 1;
      product.total_price = product.qty * product.price;
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
