import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product = {};
  carts = JSON.parse(localStorage.getItem("cart_shopping")) || [];
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.product = this.productService.theSingleProduct;
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.getSingleProduct(id).subscribe((singleProduct: any) => {
      singleProduct["new_price"] =
        singleProduct.price -
        (singleProduct.discount / 100) * singleProduct.price;
      this.product = singleProduct;
    });
  }
  handleAddToCart(product) {
    this.productService.changeStatusOfProduct(product.id, true).subscribe(
      data => {
        this.carts.push(product);
        localStorage.setItem("cart_shopping", JSON.stringify(this.carts));
        product.in_my_cart = true;
        // Update cart length
        let theNewCartLengthValue = (this.productService.cartLength += 1);
        this.productService.updataCartLengthNumber(theNewCartLengthValue);
      },
      err => {
        console.log(err);
      }
    );
  }
}
