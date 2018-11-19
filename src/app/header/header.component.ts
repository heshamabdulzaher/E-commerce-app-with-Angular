import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "../services/sharing-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  cartLength: number = 0;
  searchQueryWord = "";
  isUserLoggedIn: boolean = false;
  userName: string = "";
  firstChar = "";
  dropMenuIsOpen: boolean = false;
  focusOnSearchInp: boolean = false;
  phoneMode: boolean = false;
  ipadAndSmallPcMode: boolean = false;

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router
  ) {}

  ngOnInit() {
    if (window.outerWidth < 575) {
      this.phoneMode = true;
    } else if (window.outerWidth > 575 && window.outerWidth < 1100) {
      this.ipadAndSmallPcMode = true;
    }

    // Observe the change to the cartLength if return false run handleCartLengthFunction()
    this.sharingDataService.cartLength_asObs.subscribe(res => {
      res ? (this.cartLength = res) : this.handleCartLengthFunction();
    });

    // Listen if user is logged or not
    this.sharingDataService.userLoggedIn_asObs.subscribe(res => {
      let userOnLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (res) {
        this.isUserLoggedIn = true;
        this.userName = userOnLocalStorage.name;
      } else {
        if (userOnLocalStorage) {
          this.isUserLoggedIn = true;
          this.userName = userOnLocalStorage.name;
        } else {
          this.isUserLoggedIn = false;
        }
      }
    });
  }

  // run search mode On small devices
  handleSearchMode() {
    this.focusOnSearchInp = !this.focusOnSearchInp;
  }
  test() {
    console.log(this.dropMenuIsOpen);
  }

  // Handle CartLength
  handleCartLengthFunction() {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem("userCart"));
    if (!cartFromLocalStorage || cartFromLocalStorage.items.length === 0) {
      this.cartLength = 0;
    } else {
      this.cartLength = cartFromLocalStorage.items.length;
    }
  }

  // Get the search query word
  shareQuerWord(e) {
    this.sharingDataService.getQueryWord(e);
    if (e.length > 0) {
      this.router.navigate(["/"]);
    }
  }

  // Toggle Drop Menu
  toggleDropMenu() {
    this.dropMenuIsOpen = !this.dropMenuIsOpen;
  }

  // Login
  logIn() {
    this.sharingDataService.changeStatusOfModal(true);
  }

  // LogOut
  logOut() {
    localStorage.removeItem("userCart");
    this.sharingDataService.changeStatusOfUser(false);
  }
}
