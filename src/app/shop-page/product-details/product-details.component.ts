import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  product = {};
  ngOnInit() {
    // this.product = this.productService.theSingleProduct;
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.getSingleProduct(id).subscribe(singleProduct => {
      singleProduct["new_price"] =
        singleProduct.price -
        (singleProduct.discount / 100) * singleProduct.price;
      this.product = singleProduct;
    });
  }
}
