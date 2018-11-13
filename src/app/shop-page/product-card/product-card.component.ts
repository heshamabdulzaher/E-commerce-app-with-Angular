import { Component, OnInit } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { SharingDataService } from "../../../../src/app/services/sharing-data.service";
import { ProductsService } from "../../services/products.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  allProducts: any = [];
  category;
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
    this.SearchInProducts();
    this.openModal();
  }

  openModal() {
    this.sharingDataService.modalAsObservable.subscribe(modalIsOpen => {
      let user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        // If you're a user
        this.sharingDataService.detectUser(true);
      } else {
        // If you're not a user
        this.sharingDataService.detectUser(false);
      }
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

  // Get all products from DB
  getAllProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.allProducts = data;
        this.handleDiscount(this.allProducts);
        this.disabledAddToCartBtn(this.allProducts);
        this.sharingDataService.reInitProuctsFilterAsObservable.subscribe(
          data => {
            this.filterProducts(data);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  disabledAddToCartBtn(Products) {
    let cart = JSON.parse(localStorage.getItem("userCart"));
    if (cart) {
      Products = Products.map(item => {
        for (let i = 0; i < cart.items.length; i++) {
          if (item.id === cart.items[i].id) {
            item.in_my_cart = true;
            console.log(item);
          }
        }
        return item;
      });
    } else {
      return false;
    }
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
      this.sharingDataService.modalIsOpen(true);
    }
  }
}
