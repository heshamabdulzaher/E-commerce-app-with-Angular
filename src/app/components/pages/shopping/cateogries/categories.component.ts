import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { SharingDataService } from "src/app/services/sharing-data.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  showCategoriesList: boolean = false;
  categorySelected: string = "All";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharingDataService: SharingDataService
  ) {}

  handleFiltering(filterTag) {
    const queryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );
    queryParams["filter"] = filterTag;
    this.router.navigate(["."], { queryParams: queryParams });
    // Toggle oue filtering list on small screens
    if (window.innerWidth < 901) {
      this.showCategoriesList = !this.showCategoriesList;
      this.categorySelected = filterTag;
    }
  }

  listOfCategories = [
    {
      img_url: "assets/svg/categories/select-all.svg",
      tag: "all",
      active: false
    },
    {
      img_url: "assets/svg/categories/shoes.svg",
      tag: "shoes",
      active: false
    },
    {
      img_url: "assets/svg/categories/pants.svg",
      tag: "pants",
      active: false
    },
    {
      img_url: "assets/svg/categories/t-shirt.svg",
      tag: "t-shirt",
      active: false
    },
    {
      img_url: "assets/svg/categories/shirt.svg",
      tag: "shirt",
      active: false
    },
    {
      img_url: "assets/svg/categories/jacket.svg",
      tag: "jacket",
      active: false
    },
    {
      img_url: "assets/svg/categories/blazer.svg",
      tag: "blazer",
      active: false
    },
    {
      img_url: "assets/svg/categories/coat.svg",
      tag: "coat",
      active: false
    },
    {
      img_url: "assets/svg/categories/suit.svg",
      tag: "suit",
      active: false
    }
  ];
  ngOnInit() {
    this.observeFilterQueryFunction();
    this.filterValidation();
    // Reset filter bar when I search
    this.sharingDataService.searchQuery_asObs.subscribe(res => {
      if (res.length) {
        this.categorySelected = "All";
      }
    });
  }
  // Toggle oue filtering list on small screens
  toggleCategoriesList() {
    if (window.innerWidth < 901) {
      this.showCategoriesList = !this.showCategoriesList;
    }
  }

  // Observe the filter param word to set class active this category
  observeFilterQueryFunction() {
    this.sharingDataService.reInitProuctsFilter_asObs.subscribe(queryParam => {
      this.listOfCategories.map(obj => {
        obj.active = false;
        if (obj.tag === queryParam) {
          obj.active = true;
        }
        return obj;
      });
    });
  }

  filterValidation() {
    const queryParams: Params = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );
    let filterTagMatched = false;
    this.listOfCategories.map(item => {
      if (item.tag === queryParams["filter"]) {
        filterTagMatched = true;
      }
    });
    if (!filterTagMatched) {
      this.router.navigate(["/"]);
    }
  }
}
