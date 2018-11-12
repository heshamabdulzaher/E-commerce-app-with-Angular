import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  getSingleCartByUserId(userId) {
    return this.http.get(environment.base_URL + "/carts?user_id=" + userId);
  }

  updatingMyCart(cart: any) {
    return this.http.patch(environment.base_URL + "/carts/" + cart.id, {
      items: cart.items
    });
  }

  saveNewCart(cart) {
    return this.http.post(environment.base_URL + "/carts", cart);
  }
}
