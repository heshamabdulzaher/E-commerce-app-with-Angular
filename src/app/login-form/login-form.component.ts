import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UsersService } from "../services/users.service";
import { ProductsService } from "../services/products.service";
import { SharingDataService } from "../services/sharing-data.service";

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
    // Get all users
    this.userService.getUsers().subscribe(
      (users: any) => {
        // If I have users
        if (users.length > 0) {
          users.forEach(user => {
            if (
              user.email == loginForm.value.email &&
              user.password === loginForm.value.password
            ) {
              this.showErrorMsg = false;
              localStorage.setItem("user", JSON.stringify(user));
              this.closeModal();
            } else {
              this.showErrorMsg = true;
            }
          });
        } else {
          // If this user is a first
          this.showErrorMsg = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  // End Submit btn functionality
  goToRegistrationForm() {
    this.messageEvent.emit(this.changeForm);
  }
  closeModal() {
    this.sharingDataService.changeStatusOfModal(false);
    document.body.style.overflow = "auto";
  }
}
