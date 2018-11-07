import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivationEnd, Router } from "@angular/router";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  carts = JSON.parse(localStorage.getItem("cart_shopping")) || [];
  allProducts: any = [];
  category;

  constructor(private productService: ProductsService, private router: Router) {
    router.events.subscribe(data => {
      if (data instanceof ActivationEnd) {
        this.category = data.snapshot.queryParams["filter"];
        this.filterProducts(this.category);
      }
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      data => {
        // console.log(data);
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
    this.carts.push(product);
    localStorage.setItem("cart_shopping", JSON.stringify(this.carts));
    product.in_my_cart = true;

    this.productService.changeStatusOfProduct(product.id, true).subscribe(
      data => {
        // console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
