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
  cartLength: number = 0;
  itemIsExistInCart: boolean = false;

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
    this.getProductsFromDB();
    this.SearchInProducts();
    this.observeModals();
    this.observeFilterQueryFunction();
    this.observeCartLength();
  }

  // Observe CartLength
  observeCartLength() {
    this.sharingDataService.cartLength_asObs.subscribe(res => {
      res ? (this.cartLength = res) : this.setCartLength();
    });
  }

  // Update cartLength
  setCartLength() {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem("userCart"));
    if (!cartFromLocalStorage || cartFromLocalStorage.items.length === 0) {
      this.cartLength = 0;
    } else {
      this.cartLength = cartFromLocalStorage.items.length;
    }
  }

  // Get all products from DB
  getProductsFromDB() {
    this.productService.getProducts().subscribe(data => {
      this.allProducts = data;
      this.handleDiscount();
      this.disabledAddToCartBtn();
      this.sharingDataService.reInitProuctsFilter_asObs.subscribe(data =>
        this.filterProducts(data)
      );
    });
  }

  // Handle search in products functionality
  SearchInProducts() {
    this.sharingDataService.searchQuery_asObs.subscribe(data => {
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

  // This function to Share status of modlas with other components >>> is open or not
  observeModals() {
    this.sharingDataService.modalStatus_asObs.subscribe(modalIsOpen => {
      let user = JSON.parse(localStorage.getItem("user"));
      user
        ? this.sharingDataService.changeStatusOfUser(true)
        : this.sharingDataService.changeStatusOfUser(false);
    });
  }

  // This function to reCall filterProducts(), run when component is gonna render with a query param
  observeFilterQueryFunction() {
    this.sharingDataService.reInitProuctsFilter_asObs.subscribe(queryParam => {
      this.filterProducts(queryParam);
    });
  }

  // Filter function
  filterProducts(filterName) {
    this.allProducts = this.allProducts.map(product => {
      if (filterName) {
        if (filterName.toLowerCase() === "all" || !filterName.toLowerCase()) {
          product.show = true;
        } else {
          if (filterName.toLowerCase() === product.category.toLowerCase()) {
            product.show = true;
          } else {
            product.show = false;
          }
        }
      }
      return product;
    });
    window.scrollTo(0, 0);
  }

  // Disable addToCart btn
  disabledAddToCartBtn() {
    let cart = JSON.parse(localStorage.getItem("userCart"));
    if (cart) {
      this.allProducts = this.allProducts.map(item => {
        for (let i = 0; i < cart.items.length; i++) {
          if (item.id === cart.items[i].id) {
            item.in_my_cart = true;
          }
        }
        return item;
      });
    } else {
      return false;
    }
  }

  // Set a new property to each product >>> new_price
  handleDiscount() {
    this.allProducts = this.allProducts.map(product => {
      product["new_price"] = Math.round(
        product.price - (product.discount / 100) * product.price
      );

      return product;
    });
  }

  // Handle Add to cart function
  handleAddToCart(product) {
    let user = JSON.parse(localStorage.getItem("user"));

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
          if (!user) {
            product = {};
          } else {
            this.ifUserWnanaAddProduct(product, user);
          }
        }
      });
    }
  }

  // If user wanna add a product to cart
  ifUserWnanaAddProduct(product, user) {
    // If you're a user
    this.cartService
      .getSingleCartByUserId(user.id)
      .subscribe((userCartInDB: any) => {
        if (userCartInDB.length > 0) {
          // This user have cart in DB
          let copyOfUserCart = userCartInDB[0];

          var matchItems = function(item) {
            // checks whether an item is matchItems
            return item.id === product.id;
          };

          if (copyOfUserCart.items.some(matchItems)) {
            // This item is already exist in your cart, man!
            this.itemIsExistInCart = true;
            setTimeout(() => {
              this.itemIsExistInCart = false;
            }, 6000);
          } else {
            // This item is not exist in your cart, man!
            copyOfUserCart.items.push(product);
          }
          // PATCH MY CART
          this.cartService
            .updatingMyCart(copyOfUserCart)
            .subscribe(updatedCart => {
              localStorage.setItem("userCart", JSON.stringify(updatedCart));
              this.disabledAddToCartBtn();
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
