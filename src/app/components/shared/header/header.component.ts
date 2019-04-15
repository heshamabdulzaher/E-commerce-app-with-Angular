import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { SharingDataService } from "src/app/services/sharing-data.service";

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
  searchInputFocused: boolean = false;
  windowScreenWidth: number;

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.windowScreenWidth = window.innerWidth;
    console.log(this.windowScreenWidth);
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

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.windowScreenWidth = event.target.innerWidth;
  }

  // run search mode On small devices
  handleSearchMode() {
    // console.log();
    this.searchInputFocused = !this.searchInputFocused;
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
    localStorage.removeItem("user");
    localStorage.removeItem("userCart");
    this.sharingDataService.changeStatusOfUser(false);
    this.router.navigate(["/"]);
  }
}
