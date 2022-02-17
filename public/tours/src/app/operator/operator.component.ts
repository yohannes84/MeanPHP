import { Component, OnInit } from '@angular/core';
import { Operator } from '../classes/operator';
import { OperatorService } from '../operator.service';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../classes/tour';
import { ToursService } from '../tours.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  operators:Operator[]
  tour:Tour
  txtInfo:String = "Adding Operator";
  newOperator:Operator = new Operator("","",0)
  constructor(private route: ActivatedRoute,private operatorsServices:OperatorService,private tourService:ToursService) { }
  
  ngOnInit(): void {
    
    const tourId = this.route.snapshot.params["tourId"];

    this.operatorsServices.getOperators(tourId)
      .then(response=> this._setOperators(response))
      .catch(this._errorHandler);

      this.tourService.getTour(tourId)
      .then(tourResponse=> this._setTour(tourResponse))
      .catch(this._errorHandlerGet);
  }

  
  private _errorHandlerGet(error:any):void{
    console.log("error while getting tour");
    
  }

  private _setOperators(operators:Operator[]):void{
    this.operators= operators   
  }
  private _setTour(tour:Tour):void{
    this.tour= tour   
  }

 

  save(){
    console.log(this.newOperator);
    const tourId = this.route.snapshot.params["tourId"];
     this.operatorsServices.addOperator(this.newOperator,tourId)
     .then(response=>alert("New operator added"))
     .catch(this._errorHandler);
     
     
   }

   update(){
    this.txtInfo = "Updating Operator";
    const tourId = this.route.snapshot.params["tourId"];
    const operatorId = this.route.snapshot.params["operatorId"];
    console.log(operatorId);
    
     this.operatorsServices.updateOperator(this.newOperator,tourId,operatorId)
     .then(response=>alert("Record Updated"))
     .catch(this._errorHandler);
     
     
   }

   private _errorHandler(error:any):void{
    console.log("error while updating tour");
    
  }

}
