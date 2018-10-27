import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ShopPageComponent } from "./shop-page/shop-page.component";
const routes: Routes = [
  { path: "", component: ShopPageComponent },
  { path: "admin", component: AdminDashboardComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [AdminDashboardComponent, ShopPageComponent];
