import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopPageComponent } from "./shop-page/shop-page.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ShippingFormComponent } from "./checkout/shipping-form/shipping-form.component";
import { PaymentComponent } from "./checkout/payment/payment.component";
import { DoneStepComponent } from "./checkout/done-step/done-step.component";
import { AboutComponent } from "./about/about.component";
const routes: Routes = [
  { path: "", redirectTo: "shopping", pathMatch: "full" },
  { path: "shopping", component: ShopPageComponent },
  { path: "about", component: AboutComponent },
  { path: "shopping/product/:id", component: ProductDetailsComponent },
  { path: "shopping_cart", component: ShoppingCartComponent },
  { path: "checkout", redirectTo: "checkout/shipping_cart", pathMatch: "full" },
  { path: "checkout/shipping_cart", component: ShippingFormComponent },
  { path: "checkout/payment_form", component: PaymentComponent },
  { path: "checkout/done", component: DoneStepComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  ShopPageComponent,
  ProductDetailsComponent,
  ShoppingCartComponent,
  ShippingFormComponent,
  PaymentComponent,
  DoneStepComponent,
  AboutComponent
];
