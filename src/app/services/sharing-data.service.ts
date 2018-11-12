import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SharingDataService {
  // Get cartLength from localStorage and set it as a value to behaviorSubjectOfCart and make it as a observable
  cart = JSON.parse(localStorage.getItem("userCart")) || [];
  cartLength = this.cart.length;
  behaviorSubjectOfCart = new BehaviorSubject<number>(this.cartLength);
  cartAsObservable = this.behaviorSubjectOfCart.asObservable();

  behaviorSubjectOfModal = new BehaviorSubject<boolean>(false);
  modalAsObservable = this.behaviorSubjectOfModal.asObservable();

  searchQuery = new BehaviorSubject<string>("");
  searchQueryAsObservable = this.searchQuery.asObservable();

  // Re run the filter for the proucts when the user visit the shop page AND the url has a filter param
  reInitProuctsFilter = new BehaviorSubject<string>("");
  reInitProuctsFilterAsObservable = this.reInitProuctsFilter.asObservable();

  constructor(private http: HttpClient) {}

  updataCartLengthNumber(n) {
    this.behaviorSubjectOfCart.next(n);
  }

  modalIsOpen(n) {
    this.behaviorSubjectOfModal.next(n);
  }

  getQueryWord(n) {
    this.searchQuery.next(n);
  }

  reInitFilterFunction(n) {
    this.reInitProuctsFilter.next(n);
  }
}
