import { Component, OnInit } from "@angular/core";
import { SharingDataService } from "./services/sharing-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  showFormsToUser: boolean = false;
  showRegisterForm: boolean = false;
  constructor(private sharingDataService: SharingDataService) {}
  goToTheOtherForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }
  ngOnInit() {
    this.openModal();
  }
  openModal() {
    this.sharingDataService.modalAsObservable.subscribe(data => {
      this.showFormsToUser = data;
      if (this.showFormsToUser) {
        document.body.style.overflow = "hidden";
      }
    });
  }
  colseModal(modal, e) {
    if (e.target == modal) {
      this.sharingDataService.modalIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }
}
