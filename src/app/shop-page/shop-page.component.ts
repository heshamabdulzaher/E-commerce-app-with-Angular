import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.css"]
})
export class ShopPageComponent implements OnInit {
  constructor() {}

  listOfCategories = [
    {
      img_url: "assets/svg/select-all.svg",
      name: "all"
    },
    {
      img_url: "assets/svg/shoes.svg",
      name: "shoes"
    },
    {
      img_url: "assets/svg/pants.svg",
      name: "pants"
    },
    {
      img_url: "assets/svg/t-shirt.svg",
      name: "t-shirt"
    },
    {
      img_url: "assets/svg/shirt.svg",
      name: "shirt"
    },
    {
      img_url: "assets/svg/jacket.svg",
      name: "jacket"
    },
    {
      img_url: "assets/svg/blazer.svg",
      name: "blazer"
    },
    {
      img_url: "assets/svg/coat.svg",
      name: "coat"
    },
    {
      img_url: "assets/svg/suit.svg",
      name: "suit"
    }
  ];

  ngOnInit() {}
  categoryName = "shoes";

  giveMeTheCategoryName(e, cateforyName) {
    this.categoryName = cateforyName.innerText;
  }
}
