import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  // Get cartLength from localStorage and set it as a value to behaviorSubjectOfCart and make it as a observable
  cartLength = JSON.parse(localStorage.getItem("cart_shopping")).length;
  behaviorSubjectOfCart = new BehaviorSubject<number>(this.cartLength);
  cartAsObservable = this.behaviorSubjectOfCart.asObservable();

  constructor(private http: HttpClient) {}

  updataCartLengthNumber(n) {
    this.behaviorSubjectOfCart.next(n);
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

  cardClicked = false;
}
