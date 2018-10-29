import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(product) {
    return this.http.post(environment.base_URL + "/shopping_cart", product);
  }

  removeFromCart(id) {
    return this.http.delete(environment.base_URL + "/shopping_cart/" + id);
  }
}
