import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { CartService } from "./cart.service";

@Injectable({
  providedIn: "root"
})
export class SharingDataService {
  constructor(private http: HttpClient, private cartService: CartService) {}

  // Share cart length
  cartLength = new BehaviorSubject<number>(0);
  cartLength_asObs = this.cartLength.asObservable();

  // Share status of modal It's open or not
  modalIsOpen = new BehaviorSubject<boolean>(false);
  modalStatus_asObs = this.modalIsOpen.asObservable();

  // Listen to Search Query word
  searchQuery = new BehaviorSubject<string>("");
  searchQuery_asObs = this.searchQuery.asObservable();

  // Re run the filter for the proucts when the user visit the shop page AND the url has a filter param
  reInitProuctsFilter = new BehaviorSubject<string>("");
  reInitProuctsFilter_asObs = this.reInitProuctsFilter.asObservable();

  // Check if this is user Logged in or not
  userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn_asObs = this.userLoggedIn.asObservable();

  updataCartLengthNumber(n) {
    this.cartLength.next(n);
  }

  changeStatusOfModal(status: boolean) {
    this.modalIsOpen.next(status);
  }

  getQueryWord(w) {
    this.searchQuery.next(w);
  }

  reInitFilterFunction(n) {
    this.reInitProuctsFilter.next(n);
  }

  changeStatusOfUser(status: boolean) {
    this.userLoggedIn.next(status);
  }
}
