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

  descrition =
    "Lorem Ipsum is simply dummied text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.";
  productModel = new Product("", "", 0, 0, "", this.descrition);

  addNewProduct(form) {
    this.productService.addNewProduct(this.productModel).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    form.resetForm();
  }
}
