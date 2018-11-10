import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UsersService } from "../services/users.service";
import { ProductsService } from "../services/products.service";

@Component({
  selector: "app-registration-from",
  templateUrl: "./registration-from.component.html",
  styleUrls: ["./registration-from.component.css"]
})
export class RegistrationFromComponent implements OnInit {
  showErrorMsg: boolean = false;
  changeForm: boolean = true;
  @Output() messageEvent = new EventEmitter();

  constructor(
    private userService: UsersService,
    private productService: ProductsService
  ) {}

  ngOnInit() {}

  // What's gonna done here
  // _ Check if this new user or already have an account
  // _ If user have an account show err_msg "Your email is already exist, Login"
  // _ If new user call postNewUser function to post the obj

  onSubmit(registerForm) {
    let thereIsUserInLocalStorage = JSON.parse(localStorage.getItem("user"));

    this.userService.getUsers().subscribe(
      (users: any) => {
        console.log(users);

        // If the first user is gonna log in
        if (users.length == 0) {
          this.userService.postNewUser(registerForm.value).subscribe(user => {
            this.closeModal();
            localStorage.setItem("user", JSON.stringify(user));
          });
        } else if (users.length > 0) {
          users.forEach(user => {
            if (user.email == registerForm.value.email) {
              this.showErrorMsg = true;
            } else {
              this.userService
                .postNewUser(registerForm.value)
                .subscribe(user => {
                  console.log("Create new user");
                  this.closeModal();
                  localStorage.setItem("user", JSON.stringify(user));
                });
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  goToLoginForm() {
    this.messageEvent.emit(this.changeForm);
  }
  closeModal() {
    this.productService.modalIsOpen(false);
    document.body.style.overflow = "auto";
  }
}
