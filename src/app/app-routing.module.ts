import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ShopPageComponent } from "./shop-page/shop-page.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
const routes: Routes = [
  { path: "", component: ShopPageComponent },
  { path: "admin", component: AdminDashboardComponent },
  { path: "product/:id", component: ProductDetailsComponent },
  { path: "shopping_cart", component: ShoppingCartComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [AdminDashboardComponent, ShopPageComponent];
