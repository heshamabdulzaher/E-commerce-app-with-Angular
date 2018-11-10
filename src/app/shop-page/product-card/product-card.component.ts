import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivationEnd, Router } from "@angular/router";
import { SharingDataService } from "src/app/services/sharing-data.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  carts = JSON.parse(localStorage.getItem("cart_shopping")) || [];
  allProducts: any = [];
  category;
  cart;

  constructor(
    private productService: ProductsService,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {
    router.events.subscribe(data => {
      if (data instanceof ActivationEnd) {
        this.category = data.snapshot.queryParams["filter"];
        if (this.category) {
          this.filterProducts(this.category);
        }
      }
    });
  }

  ngOnInit() {
    this.getAllProducts();
    this.removeQueryFromUrl();
  }
  removeQueryFromUrl() {
    let url: string = this.router.url.substring(
      0,
      this.router.url.indexOf("?")
    );
    this.router.navigateByUrl(url);
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.allProducts = data;
        this.handleDiscount(this.allProducts);
      },
      err => {
        console.log(err);
      }
    );
  }

  filterProducts(filterName) {
    this.allProducts = this.allProducts.map(product => {
      if (filterName.toLowerCase() === "all" || !filterName.toLowerCase()) {
        product.show = true;
      } else {
        if (filterName.toLowerCase() === product.category.toLowerCase()) {
          product.show = true;
        } else {
          product.show = false;
        }
      }
      return product;
    });
    window.scrollTo(0, 0);
  }

  handleDiscount(allProducts) {
    allProducts = allProducts.map(product => {
      product["new_price"] = Math.round(
        product.price - (product.discount / 100) * product.price
      );

      return product;
    });
  }

  handleAddToCart(product) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.productService.changeStatusOfProduct(product.id, true).subscribe(
        data => {
          this.carts.push(product);
          localStorage.setItem("cart_shopping", JSON.stringify(this.carts));
          product.in_my_cart = true;
          // Update cart length
          let theNewCartLengthValue = (this.sharingDataService.cartLength += 1);
          this.sharingDataService.updataCartLengthNumber(theNewCartLengthValue);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.sharingDataService.modalIsOpen(true);
    }
  }
}
