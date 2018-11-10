import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivationEnd, Router } from "@angular/router";
import { SharingDataService } from "src/app/services/sharing-data.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  carts = JSON.parse(localStorage.getItem("cart_shopping")) || [];
  allProducts: any = [];
  category;
  cartItems: any = [];
  searchQueryWord: string = "";
  theProductsIsHidden: number = 0;
  noResultsFound: boolean = false;

  constructor(
    private productService: ProductsService,
    private sharingDataService: SharingDataService,
    private cartService: CartService,
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
    this.SearchInProducts();
    this.cartService.getProductsInMyCart().subscribe(data => {
      this.cartItems = data;
    });
  }
  // Handle search in products functionality
  SearchInProducts() {
    this.sharingDataService.searchQueryAsObservable.subscribe(data => {
      this.theProductsIsHidden = 0;
      this.searchQueryWord = data.toLowerCase();

      if (this.searchQueryWord === "" || this.searchQueryWord === " ") {
        this.allProducts = this.allProducts.map(product => {
          product.show = true;
          this.theProductsIsHidden = 0;
          return product;
        });
      } else {
        this.allProducts = this.allProducts.map(product => {
          if (product.name.toLowerCase().search(this.searchQueryWord) == -1) {
            product.show = false;
          } else {
            product.show = true;
          }
          return product;
        });
      }
      this.allProducts.forEach(product => {
        if (!product.show) {
          this.theProductsIsHidden++;
          if (this.theProductsIsHidden == this.allProducts.length) {
            this.noResultsFound = true;
          } else {
            this.noResultsFound = false;
          }
        }
      });
    });
  }
  // There is a problem here
  removeQueryFromUrl() {
    let url: string = this.router.url.substring(
      0,
      this.router.url.indexOf("?")
    );
    this.router.navigateByUrl(url);
  }

  // Get all products from DB
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

  // Filter function
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

  // Add new property to every product called new_price => After discount
  handleDiscount(allProducts) {
    allProducts = allProducts.map(product => {
      product["new_price"] = Math.round(
        product.price - (product.discount / 100) * product.price
      );
      return product;
    });
  }

  getAllProductsFromCart() {
    this.cartService.getProductsInMyCart().subscribe(data => {
      console.log(data);
    });
  }

  getSingleCart(id) {
    this.cartService.getSingleCartById(id).subscribe(data => {
      console.log(data);
    });
  }

  // patch product in my cart
  patchCart(cart) {
    // this.cartService.updatingMyCart(id, cart).subscribe(data => {
    //   console.log(data);
    // });
  }
  // Handle Add to cart function
  handleAddToCart(product) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.cartItems.push(product);

      let cart = { user_id: user.id, cart_items: this.cartItems };

      this.cartService.getProductsInMyCart().subscribe((carts: any) => {
        if (carts.length == 0) {
          // If my cart is empty => Post the first cart
          this.cartService.addNewCart(cart).subscribe(data => {
            this.cartItems.push(product);
            console.log("cart_items", this.cartItems);
          });
        } else {
          // If the cart have data
          for (let i = 0; i < carts.length; i++) {
            if (carts[i].user_id == user.id) {
              // If this user_id is already in carts array => Patch data
              console.log("id ", carts[i].id);
              console.log("cart", cart);
              console.log("Patch data");
              // this.patchCart(cart[i]);
              break;
            } else {
              // If this user_id is new in my cart => post data
              console.log("Added new cart");
              break;
            }
          }
        }
      });
      // console.log(cart);

      // this.productService.changeStatusOfProduct(product.id, true).subscribe(
      //   data => {
      //     this.carts.push(product);
      //     localStorage.setItem("cart_shopping", JSON.stringify(this.carts));
      //     product.in_my_cart = true;
      //     // Update cart length
      //     let theNewCartLengthValue = (this.sharingDataService.cartLength += 1);
      //     this.sharingDataService.updataCartLengthNumber(theNewCartLengthValue);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    } else {
      this.sharingDataService.modalIsOpen(true);
    }
  }
}
