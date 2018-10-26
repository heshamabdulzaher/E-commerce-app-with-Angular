import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  URL = environment.base_URL + "/products";
  addNewProduct(id) {
    return this.http.post(this.URL, id);
  }
}
