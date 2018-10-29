import { Component, OnInit, Input } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  allProducts: any = [];
  ngOnInit() {
    this.productService.getProducts().subscribe(
      data => {
        console.log(data);
        this.allProducts = data;
        this.handleDiscount(this.allProducts);
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

  handleAddToCart(product) {
    this.cartService.addToCart(product).subscribe(
      data => {
        product.in_my_cart = true;
        //
        this.productService.changeStatusOfProduct(product.id, true).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
  removeProductFromCart(addBtn, product, cart) {
    this.cartService.removeFromCart(product.id).subscribe(
      data => {
        product.in_my_cart = false;
        //
        this.productService.changeStatusOfProduct(product.id, false).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
}
