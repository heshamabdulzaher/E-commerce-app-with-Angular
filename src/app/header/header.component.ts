import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "../services/sharing-data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css", "./responsive.component.css"]
})
export class HeaderComponent implements OnInit {
  cartLength: number = 0;
  searchQueryWord = "";
  isUserLoggedIn: boolean = false;
  userName: string = "";
  firstChar = "";
  dropMenuIsOpen: boolean = false;
  constructor(private sharingDataService: SharingDataService) {}

  ngOnInit() {
    this.sharingDataService.cartLength_asObs.subscribe(res => {
      res ? (this.cartLength = res) : this.setCartLength();
    });

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

  setCartLength() {
    let cartFromLocalStorage = JSON.parse(localStorage.getItem("userCart"));
    if (!cartFromLocalStorage || cartFromLocalStorage.items.length === 0) {
      this.cartLength = 0;
    } else {
      this.cartLength = cartFromLocalStorage.items.length;
    }
  }

  shareQuerWord(e) {
    this.sharingDataService.getQueryWord(e);
  }

  // Drop Menu
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
