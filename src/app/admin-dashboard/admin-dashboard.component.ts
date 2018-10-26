import { Component, OnInit } from "@angular/core";
import { Product } from "./product";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  ngOnInit() {}

  productModel = new Product("", "", 0, 0, "", "", "");

  addNewProduct() {
    console.log(this.productModel);
    this.productService.addNewProduct(this.productModel).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
