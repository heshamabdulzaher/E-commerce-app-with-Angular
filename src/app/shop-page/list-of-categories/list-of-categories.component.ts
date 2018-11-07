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
      img_url: "assets/svg/categories/select-all.svg",
      name: "all"
    },
    {
      img_url: "assets/svg/categories/shoes.svg",
      name: "shoes"
    },
    {
      img_url: "assets/svg/categories/pants.svg",
      name: "pants"
    },
    {
      img_url: "assets/svg/categories/t-shirt.svg",
      name: "t-shirt"
    },
    {
      img_url: "assets/svg/categories/shirt.svg",
      name: "shirt"
    },
    {
      img_url: "assets/svg/categories/jacket.svg",
      name: "jacket"
    },
    {
      img_url: "assets/svg/categories/blazer.svg",
      name: "blazer"
    },
    {
      img_url: "assets/svg/categories/coat.svg",
      name: "coat"
    },
    {
      img_url: "assets/svg/categories/suit.svg",
      name: "suit"
    }
  ];
  ngOnInit() {}
}
