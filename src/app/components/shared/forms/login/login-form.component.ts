import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { ProductsService } from "src/app/services/products.service";
import { SharingDataService } from "src/app/services/sharing-data.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  showErrorMsg: boolean = false;
  changeForm: boolean = false;
  @Output() messageEvent = new EventEmitter();
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private sharingDataService: SharingDataService
  ) {}

  ngOnInit() {}
  onSubmit(loginForm) {
    // Get all users from DB
    this.userService.getUsers().subscribe((users: any) => {
      // Make sure that user's email is aleady exist in DB
      if (users.length > 0) {
        users.forEach(user => {
          if (
            user.email == loginForm.value.email &&
            user.password === loginForm.value.password
          ) {
            // You'
            this.showErrorMsg = false;
            localStorage.setItem("user", JSON.stringify(user));
            this.closeModal();
          } else {
            this.showErrorMsg = true;
          }
        });
      } else {
        // If no users in DB
        this.showErrorMsg = true;
      }
    });
  }

  // the user type something wrong
  goToRegistrationForm() {
    this.messageEvent.emit(this.changeForm);
  }
  closeModal() {
    this.sharingDataService.changeStatusOfModal(false);
    document.body.style.overflow = "auto";
  }
}
