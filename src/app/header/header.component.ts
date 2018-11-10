import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { SharingDataService } from "../services/sharing-data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private sharingDataService: SharingDataService
  ) {}

  cartLength;
  ngOnInit() {
    this.sharingDataService.cartAsObservable.subscribe(
      cart => (this.cartLength = cart)
    );
  }
}
