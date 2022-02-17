import { Component, OnInit } from '@angular/core';
import { Tour } from '../classes/tour';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../tours.service';
import { Operator } from '../classes/operator';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tour: Tour;
  id: string;
  operator:Operator[];
  updatedTour:Tour = new Tour("","","",0)
  

  constructor(private route: ActivatedRoute, private tourService:ToursService,private operatorService:OperatorService) {
    this.tour = new Tour("","","",0);
   }

  ngOnInit(): void {
    const tourId = this.route.snapshot.params["tourId"];
    this.tourService.getTour(tourId)
        .then(response => {this.tour = response})
        .catch(error => {console.log("Error getting tour", error);
        });

        this.operatorService.getOperators(tourId)
        .then(response => {this.operator = response})
        .catch(error => {console.log("Error getting tour", error);
        });
  }

  deleteTour(): void{
    const tourId = this.route.snapshot.params["tourId"];
    this.tourService.deleteTour(tourId)
    .then(response => {console.log(response)})
    .catch(error => {console.log("Error deleting tour", error)});
  }

  update(){
    console.log(this.updatedTour);
    const tourId = this.route.snapshot.params["tourId"];
     this.tourService.updateTour(this.updatedTour,tourId)
     .then(response=>alert("Record Updated"))
     .catch(this._errorHandler);
     
   }

   private _errorHandler(error:any):void{
    console.log("error while updating tour");
    
  }


}


