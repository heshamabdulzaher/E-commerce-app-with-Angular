import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  URL = environment.base_URL + "/products";
  addNewProduct(product) {
    return this.http.post(this.URL, product);
  }

  getProducts() {
    return this.http.get(this.URL);
  }

  theSingleProduct = {};
  getSingleProduct(id) {
    return this.http.get(this.URL + "/" + id);
  }
}
