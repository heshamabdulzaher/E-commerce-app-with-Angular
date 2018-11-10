import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  // Get cartLength from localStorage and set it as a value to behaviorSubjectOfCart and make it as a observable
  cart = JSON.parse(localStorage.getItem("cart_shopping")) || [];
  cartLength = this.cart.length;
  behaviorSubjectOfCart = new BehaviorSubject<number>(this.cartLength);
  cartAsObservable = this.behaviorSubjectOfCart.asObservable();

  shareData = new BehaviorSubject<boolean>(false);
  shareDaraAsObservable = this.shareData.asObservable();

  constructor(private http: HttpClient) {}

  updataCartLengthNumber(n) {
    this.behaviorSubjectOfCart.next(n);
  }

  modalIsOpen(n) {
    this.shareData.next(n);
  }

  addNewProduct(product) {
    return this.http.post(environment.base_URL + "/products", product);
  }

  getProducts() {
    return this.http.get(environment.base_URL + "/products");
  }

  theSingleProduct = {};
  getSingleProduct(id) {
    return this.http.get(environment.base_URL + "/products/" + id);
  }

  changeStatusOfProduct(id: number, status: boolean) {
    return this.http.patch(environment.base_URL + "/products/" + id, {
      in_my_cart: status
    });
  }
}
