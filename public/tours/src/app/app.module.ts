import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToursComponent } from './tours/tours.component';
import { TourComponent } from './tour/tour.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OperatorComponent } from './operator/operator.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SoperatorComponent } from './soperator/soperator.component';
import { CountryCodePipe } from './tours/country-code.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToursComponent,
    TourComponent,
    HomeComponent,
    ErrorPageComponent,
    OperatorComponent,
    SoperatorComponent,
    CountryCodePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
