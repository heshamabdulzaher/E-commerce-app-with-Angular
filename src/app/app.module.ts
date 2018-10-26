import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
// Angular material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { routingComponents, AppRoutingModule } from "./app-routing.module";
// Components
import { AppComponent } from "./app.component";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [AppComponent, routingComponents, AdminDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
