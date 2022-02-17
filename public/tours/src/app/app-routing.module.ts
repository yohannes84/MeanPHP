import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperatorComponent} from './operator/operator.component';
import { TourComponent } from './tour/tour.component';
import { ToursComponent } from './tours/tours.component';
import { SoperatorComponent } from './soperator/soperator.component';


const routes: Routes = [

    {path:'home', component:HomeComponent},
    {path:'tours',component:ToursComponent},
    {path: 'tours/:tourId', component:TourComponent},
    {path: 'tours/:tourId/operator',component:OperatorComponent},
    {path: 'tours/:tourId/operator/:operatorId',component:SoperatorComponent}
    ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
