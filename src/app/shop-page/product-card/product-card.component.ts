import { Component, OnInit, Input } from "@angular/core";
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
        this.handleDiscount(this.allProducts);
        // Filter data
        // let activeCategory = this.activeCategory.toLowerCase();
        // this.allProducts = this.allProducts.filter(product => {
        //   if (product.category.toLowerCase() === activeCategory) {
        //     return product;
        //   }
        // });
      },
      err => {
        console.log(err);
      }
    );
  }

  handleDiscount(allProducts) {
    allProducts = allProducts.map(product => {
      product["new_price"] =
        product.price - (product.discount / 100) * product.price;
      return product;
    });
  }

  @Input()
  public activeCategory;
}
