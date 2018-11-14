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
  user: boolean = false;
  userName: string = "";
  firstChar = "";
  dropMenuIsOpen: boolean = false;
  constructor(private sharingDataService: SharingDataService) {}

  ngOnInit() {
    this.sharingDataService.cartLength_asObs.subscribe(res => {
      res ? (this.cartLength = res) : this.setCartLength();
    });

    // console.log(userOnLocalStorage.name);
    // if (userOnLocalStorage.name) {
    //   console.log("hi");
    // } else {
    //   console.log("msh");
    // }

    let userOnLocalStorage = JSON.parse(localStorage.getItem("user"));
    this.sharingDataService.userLoggedIn_asObs.subscribe(res => {
      this.user = res;
      if (res) {
        this.firstChar = userOnLocalStorage.name.charAt(0);
        this.userName = userOnLocalStorage.name;
      } else {
        // if (
        //   Object.keys(userOnLocalStorage).length === 0 &&
        //   userOnLocalStorage.constructor === Object
        // ) {
        //   this.user = false;
        // } else {
        //   this.firstChar = userOnLocalStorage.name.charAt(0);
        //   this.userName = userOnLocalStorage.name;
        //   this.user = true;
        // }
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
