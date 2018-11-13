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
    const userCartInLocalStorage = JSON.parse(localStorage.getItem("userCart"));
    let copyOfLocalCart;
    if (user && userCartInLocalStorage) {
      // If this is user and have a cart in localStorage
      copyOfLocalCart = { ...userCartInLocalStorage };
      copyOfLocalCart.items.push(product);
      // PATCH the db cart
      this.cartService
        .updatingMyCart(copyOfLocalCart)
        .subscribe(updatedCart => {
          localStorage.setItem("userCart", JSON.stringify(updatedCart));
          product.in_my_cart = true;
          this.sharingDataService.updataCartLengthNumber(
            copyOfLocalCart.items.length
          );
        });
    } else if (user && !userCartInLocalStorage) {
      // If this is user but dosen't have a cart in localStorage
      // the new cart
      const newCart = {
        user_id: user.id,
        items: [product]
      };
      // POST new cart
      this.cartService.saveNewCart(newCart).subscribe(savedCart => {
        localStorage.setItem("userCart", JSON.stringify(savedCart));
        copyOfLocalCart = JSON.parse(localStorage.getItem("userCart"));
        product.in_my_cart = true;
        this.sharingDataService.updataCartLengthNumber(
          copyOfLocalCart.items.length
        );
      });
    } else {
      this.sharingDataService.changeStatusOfModal(true);
      this.sharingDataService.modalStatus_asObs.subscribe(modal => {
        if (!modal) {
          this.sharingDataService.userLoggedIn_asObs.subscribe(userLogged => {
            if (userLogged) {
              let user = JSON.parse(localStorage.getItem("user"));
              const newCart = {
                user_id: user.id,
                items: [product]
              };
              // POST new cart
              this.cartService.saveNewCart(newCart).subscribe(savedCart => {
                localStorage.setItem("userCart", JSON.stringify(savedCart));
                copyOfLocalCart = JSON.parse(localStorage.getItem("userCart"));
                product.in_my_cart = true;
                this.sharingDataService.updataCartLengthNumber(
                  copyOfLocalCart.items.length
                );
              });
            } else {
              console.log("msh");
            }
          });
        }
      });
    }
  }
}
