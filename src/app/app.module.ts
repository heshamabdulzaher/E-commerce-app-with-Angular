import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { routingComponents, AppRoutingModule } from "./app-routing.module";
// Components
import { AppComponent } from "./app.component";
// Pages
import { ProductCardComponent } from "./components/pages/shopping/product-card/product-card.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { CategoriesComponent } from "./components/pages/shopping/cateogries/categories.component";
import { StpesBarComponent } from "./components/pages/checkout/stpes-bar/stpes-bar.component";
import { LoginFormComponent } from "./components/shared/forms/login/login-form.component";
import { RegistrationFromComponent } from "./components/shared/forms/registration/registration-from.component";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProductCardComponent,
    HeaderComponent,
    CategoriesComponent,
    StpesBarComponent,
    LoginFormComponent,
    RegistrationFromComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
