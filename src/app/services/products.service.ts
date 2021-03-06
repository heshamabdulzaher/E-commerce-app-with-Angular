import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  addNewProduct(product) {
    return this.http.post(environment.base_URL + "/products", product);
  }

  getProducts() {
    return this.http.get(environment.base_URL + "/products");
  }

  getGroupOfProducts(whichGroup) {
    return this.http.get(
      environment.base_URL + `/products?_page=${whichGroup}&_limit=12`
    );
  }

  getSingleProduct(id) {
    return this.http.get(environment.base_URL + "/products/" + id);
  }

  changeStatusOfProduct(id: number, status: boolean) {
    return this.http.patch(environment.base_URL + "/products/" + id, {
      in_my_cart: status
    });
  }
}
