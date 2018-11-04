import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  allProducts: any = [];
  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getProducts().subscribe(
      data => {
        // console.log(data);
        this.allProducts = data;
        this.handleDiscount(this.allProducts);
      },
      err => {
        console.log(err);
      }
    );
  }

  handleDiscount(allProducts) {
    allProducts = allProducts.map(product => {
      product["new_price"] = Math.round(
        product.price - (product.discount / 100) * product.price
      );

      return product;
    });
  }

  carts = JSON.parse(localStorage.getItem("cart_shopping")) || [];
  handleAddToCart(product) {
    this.carts.push(product);
    localStorage.setItem("cart_shopping", JSON.stringify(this.carts));
    product.in_my_cart = true;

    this.productService.changeStatusOfProduct(product.id, true).subscribe(
      data => {
        // console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
