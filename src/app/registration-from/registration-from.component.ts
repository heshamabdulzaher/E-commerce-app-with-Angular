import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ProductsService } from '../services/products.service';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'app-registration-from',
  templateUrl: './registration-from.component.html',
  styleUrls: ['./registration-from.component.css']
})
export class RegistrationFromComponent implements OnInit {
  changeForm: boolean = true;
  showErrorMsg: boolean = false;

  @Output() messageEvent = new EventEmitter();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private sharingDataService: SharingDataService
  ) {}

  ngOnInit() {}

  onSubmit(registerForm) {
    this.userService
      .getUserByEmail(registerForm.value.email)
      .subscribe((user: any) => {
        if (user.length > 0) {
          this.showErrorMsg = true;
        } else {
          this.userService.postNewUser(registerForm.value).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.closeModal();
          });
        }
      });
  }

  goToLoginForm() {
    this.messageEvent.emit(this.changeForm);
  }
  closeModal() {
    this.sharingDataService.modalIsOpen(false);
    document.body.style.overflow = 'auto';
  }
}
