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
        console.log(this.allProducts);
      },
      err => {
        console.log(err);
      }
    );
  }
}
