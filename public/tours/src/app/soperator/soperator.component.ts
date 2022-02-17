import { Component, OnInit } from '@angular/core';
import { Operator } from '../classes/operator';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../tours.service';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-soperator',
  templateUrl: './soperator.component.html',
  styleUrls: ['./soperator.component.css']
})
export class SoperatorComponent implements OnInit {

  operator:Operator
  id: string;
  updatedOperator:Operator = new Operator("","",0)
  

  constructor(private route: ActivatedRoute, private tourService:ToursService,private operatorService:OperatorService) {
    
   }

  ngOnInit(): void {
    const operatorId = this.route.snapshot.params["operatorId"]
    const tourId = this.route.snapshot.params["tourId"];
        this.operatorService.getOperator(tourId,operatorId)
        .then((response) => {this.operator = response})
        .catch((error) => {console.log("Error getting tour", error);
        });
  }

  deleteOperator(){
    let index = 0
  
    const tourId = this.route.snapshot.params["tourId"];
    const operatorId = this.route.snapshot.params["operatorId"]
    this.operatorService.deleteOperator(tourId,operatorId )
    .then(response => {console.log(response)})
    .catch(error => {console.log("Error getting tour", error)});
  }

  update(){
    
    const tourId = this.route.snapshot.params["tourId"];
    const operatorId = this.route.snapshot.params["operatorId"]
     this.operatorService.updateOperator(this.updatedOperator,tourId,operatorId)
     .then(()=>alert("Record Updated"))
     .catch(this._errorHandler);
     
     
   }

   private _errorHandler(error:any):void{
    console.log("error while updating tour");
    
  }

}
