import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { routingComponents, AppRoutingModule } from "./app-routing.module";
// Components
import { AppComponent } from "./app.component";
import { ProductCardComponent } from './shop-page/product-card/product-card.component';
import { ProductDetailsComponent } from './shop-page/product-details/product-details.component';

@NgModule({
  declarations: [AppComponent, routingComponents, ProductCardComponent, ProductDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
