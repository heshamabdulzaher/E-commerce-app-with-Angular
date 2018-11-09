import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  constructor(private productService: ProductsService) {}

  cartLength;
  ngOnInit() {
    this.productService.cartAsObservable.subscribe(
      cart => (this.cartLength = cart)
    );
  }
}
