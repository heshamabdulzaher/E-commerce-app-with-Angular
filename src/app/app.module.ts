import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { routingComponents, AppRoutingModule } from "./app-routing.module";
// Components
import { AppComponent } from "./app.component";
import { ProductCardComponent } from "./shop-page/product-card/product-card.component";
import { HeaderComponent } from "./header/header.component";
import { ListOfCategoriesComponent } from "./shop-page/list-of-categories/list-of-categories.component";
import { StpesBarComponent } from "./checkout/stpes-bar/stpes-bar.component";
import { DoneStepComponent } from "./checkout/done-step/done-step.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegistrationFromComponent } from "./registration-from/registration-from.component";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProductCardComponent,
    HeaderComponent,
    ListOfCategoriesComponent,
    StpesBarComponent,
    DoneStepComponent,
    LoginFormComponent,
    RegistrationFromComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
