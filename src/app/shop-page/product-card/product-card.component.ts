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
    this.productService.getProducts().subscribe(
      data => {
        this.allProducts = data;
        this.allProducts = this.allProducts.map(product => {
          product["new_price"] =
            product.price - (product.discount / 100) * product.price;
          product.new_price = Math.round(product.new_price);
          return product;
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
