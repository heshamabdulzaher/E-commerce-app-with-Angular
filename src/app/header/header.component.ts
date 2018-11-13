import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "../services/sharing-data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  cartLength: number = 0;
  searchQueryWord = "";
  user: boolean = false;
  firstChar = "";
  constructor(private sharingDataService: SharingDataService) {}

  ngOnInit() {
    this.sharingDataService.cartLength_asObs.subscribe(res => {
      res ? (this.cartLength = res) : this.setCartLength();
    });

    this.sharingDataService.userLoggedIn_asObs.subscribe(data => {
      this.user = data;
      if (data) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.firstChar = user.name.charAt(0);
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
}
