import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
const routes: Routes = [
  { path: "", component: AdminDashboardComponent }
  // {path: "", component: AdminPanelComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [AdminDashboardComponent];
