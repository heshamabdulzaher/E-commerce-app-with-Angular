import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingPageComponent } from "./components/pages/shopping/shopping-page/shopping-page.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { singleProductComponent } from "./components/pages/single-product/single-product.component";
import { cartComponent } from "./components/pages/cart/cart.component";
import { ShippingFormComponent } from "./components/pages/checkout/shipping-form/shipping-form.component";
import { PaymentComponent } from "./components/pages/checkout/payment/payment.component";
import { DoneStepComponent } from "./components/pages/checkout/done-step/done-step.component";
const routes: Routes = [
  { path: "", redirectTo: "shopping", pathMatch: "full" },
  { path: "shopping", component: ShoppingPageComponent },
  { path: "about", component: AboutComponent },
  { path: "product/:id", component: singleProductComponent },
  { path: "cart", component: cartComponent },
  { path: "checkout", redirectTo: "checkout/shipping", pathMatch: "full" },
  { path: "checkout/shipping", component: ShippingFormComponent },
  { path: "checkout/payment_form", component: PaymentComponent },
  { path: "checkout/done", component: DoneStepComponent },
  { path: "**", redirectTo: "shopping", pathMatch: "full" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  ShoppingPageComponent,
  singleProductComponent,
  cartComponent,
  ShippingFormComponent,
  PaymentComponent,
  DoneStepComponent,
  AboutComponent
];
