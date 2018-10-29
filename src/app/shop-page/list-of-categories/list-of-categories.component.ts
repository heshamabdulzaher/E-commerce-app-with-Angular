import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list-of-categories",
  templateUrl: "./list-of-categories.component.html",
  styleUrls: ["./list-of-categories.component.css"]
})
export class ListOfCategoriesComponent implements OnInit {
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
}
