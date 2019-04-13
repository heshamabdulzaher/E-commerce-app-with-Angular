import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharingDataService } from "src/app/services/sharing-data.service";

@Component({
  selector: "app-shopping-page",
  templateUrl: "./shopping-page.component.html",
  styleUrls: ["./shopping-page.component.css"]
})
export class ShoppingPageComponent implements OnInit {
  showFormsToUser: boolean = false;
  showRegisterForm: boolean = false;
  constructor(
    private sharingDataService: SharingDataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // we need to call filterProducts() again here with the param from the url IF the url has a param!
    this.route.queryParams.subscribe(params => {
      this.sharingDataService.reInitFilterFunction(params.filter);
    });

    this.observeModalFunction();
  }

  goToTheOtherForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }
  observeModalFunction() {
    this.sharingDataService.modalStatus_asObs.subscribe(data => {
      this.showFormsToUser = data;
      this.showFormsToUser ? (document.body.style.overflow = "hidden") : false;
    });
  }
  colseModal(modal, e) {
    if (e.target == modal) {
      this.sharingDataService.changeStatusOfModal(false);
      document.body.style.overflow = "auto";
    }
  }
}
