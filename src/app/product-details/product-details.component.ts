import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivatedRoute } from "@angular/router";
import { SharingDataService } from "../services/sharing-data.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  carts = JSON.parse(localStorage.getItem("userCart")) || [];
  constructor(
    private productService: ProductsService,
    private sharingDataService: SharingDataService,
    private cartService: CartService,
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

      this.handleStatusOfMyBtn();
    });
  }
  handleStatusOfMyBtn() {
    let itemAlreadyInTheCart = item => {
      return item.id === this.product.id;
    };
    if (this.carts.items.some(itemAlreadyInTheCart)) {
      this.product.in_my_cart = true;
    }
  }

  // Handle Add to cart function
  handleAddToCart(product) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // If you're a user
      this.ifUserWnanaAddProduct(product, user);
    } else {
      // If you're not a user
      this.sharingDataService.changeStatusOfModal(true);
      this.sharingDataService.modalStatus_asObs.subscribe(modalIsOpen => {
        if (!modalIsOpen) {
          let user = JSON.parse(localStorage.getItem("user"));
          // If you're a user
          if (user) {
            this.ifUserWnanaAddProduct(product, user);
          }
        }
      });
    }
  }

  ifUserWnanaAddProduct(product, user) {
    // If you're a user
    this.cartService
      .getSingleCartByUserId(user.id)
      .subscribe((userCartInDB: any) => {
        if (userCartInDB.length > 0) {
          // This user have cart in DB
          let copyOfUserCart = userCartInDB[0];
          copyOfUserCart.items.push(product);

          // PATCH MY CART
          this.cartService
            .updatingMyCart(copyOfUserCart)
            .subscribe(updatedCart => {
              localStorage.setItem("userCart", JSON.stringify(updatedCart));
              product.in_my_cart = true;
              this.sharingDataService.updataCartLengthNumber(
                copyOfUserCart.items.length
              );
            });
        } else {
          // This user don't have cart in DB
          const newCart = {
            user_id: user.id,
            items: [product]
          };
          // POST NEW CART
          this.cartService.saveNewCart(newCart).subscribe(savedCart => {
            localStorage.setItem("userCart", JSON.stringify(savedCart));
            localStorage.setItem("userCart", JSON.stringify(savedCart));
            product.in_my_cart = true;
            this.sharingDataService.updataCartLengthNumber(1);
          });
        }
      });
  }
}
