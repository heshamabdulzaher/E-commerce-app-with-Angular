import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  getProductsInMyCart() {
    return this.http.get(environment.base_URL + "/carts");
  }
  getSingleCartById(id) {
    return this.http.get(environment.base_URL + "/carts/" + id);
  }

  updatingMyCart(id: any, cart: any) {
    return this.http.patch(
      environment.base_URL + "/products/" + id,
      cart.cart_items
    );
  }

  addNewCart(cart) {
    return this.http.post(environment.base_URL + "/carts", cart);
  }
}
