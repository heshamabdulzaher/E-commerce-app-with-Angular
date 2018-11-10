import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivationEnd, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  carts = JSON.parse(localStorage.getItem('cart_shopping')) || [];
  allProducts: any = [];
  category;
  cartItems: any = [];
  searchQueryWord: string = '';
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
        this.category = data.snapshot.queryParams['filter'];
        if (this.category) {
          this.filterProducts(this.category);
        }
      }
    });
  }

  ngOnInit() {
    this.getAllProducts();
    this.SearchInProducts();
  }
  // Handle search in products functionality
  SearchInProducts() {
    this.sharingDataService.searchQueryAsObservable.subscribe(data => {
      this.theProductsIsHidden = 0;
      this.searchQueryWord = data.toLowerCase();

      if (this.searchQueryWord === '' || this.searchQueryWord === ' ') {
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

  // Filter function
  filterProducts(filterName) {
    this.allProducts = this.allProducts.map(product => {
      if (filterName.toLowerCase() === 'all' || !filterName.toLowerCase()) {
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
      product['new_price'] = Math.round(
        product.price - (product.discount / 100) * product.price
      );
      return product;
    });
  }

  // Handle Add to cart function
  handleAddToCart(product) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userCartInLocalStorage = JSON.parse(localStorage.getItem('userCart'));

    if (user && userCartInLocalStorage) {
      const copyOfLocalCart = { ...userCartInLocalStorage };
      copyOfLocalCart.items.push(product);

      // PATCH the db cart
      this.cartService
        .updatingMyCart(copyOfLocalCart)
        .subscribe(updatedCart => {
          console.log('cart updated!', updatedCart);
          localStorage.setItem('userCart', JSON.stringify(updatedCart));
        });
    } else if (user && !userCartInLocalStorage) {
      // the new cart
      const newCart = {
        user_id: user.id,
        items: [product]
      };

      // POST new cart
      this.cartService.saveNewCart(newCart).subscribe(savedCart => {
        console.log('cart saved', savedCart);
        localStorage.setItem('userCart', JSON.stringify(savedCart));
      });
    } else {
      this.sharingDataService.modalIsOpen(true);
    }
  }
}
