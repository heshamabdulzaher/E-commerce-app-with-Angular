import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { CartService } from "./cart.service";

@Injectable({
  providedIn: "root"
})
export class SharingDataService {
  constructor(private http: HttpClient, private cartService: CartService) {}

  behaviorSubjectOfCart = new BehaviorSubject<number>(0);
  cartAsObservable = this.behaviorSubjectOfCart.asObservable();

  behaviorSubjectOfModal = new BehaviorSubject<boolean>(false);
  modalAsObservable = this.behaviorSubjectOfModal.asObservable();

  searchQuery = new BehaviorSubject<string>("");
  searchQueryAsObservable = this.searchQuery.asObservable();

  // Re run the filter for the proucts when the user visit the shop page AND the url has a filter param
  reInitProuctsFilter = new BehaviorSubject<string>("");
  reInitProuctsFilterAsObservable = this.reInitProuctsFilter.asObservable();

  // USER
  user = new BehaviorSubject<boolean>(false);
  userAsObservable = this.user.asObservable();

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

  detectUser(n) {
    this.user.next(n);
  }
}
