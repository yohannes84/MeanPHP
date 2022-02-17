import { Component, OnInit } from '@angular/core';
import { ToursService } from '../tours.service';
import { Tour } from '../classes/tour';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
 
  selectedValue:number =4
  txtquery:string
  offset_default:number = 0;
  count:number = 4;
  tours:Tour[]
  searchTxt = "";
  newTour:Tour = new Tour("","","",0)
  constructor(private toursServices:ToursService) {
    
   }

  //you dont need the offset and count variables unless otherwise asked
  ngOnInit(): void {
    this.txtquery = "?offset="
    this.toursServices.getTours(this.txtquery,this.offset_default,this.selectedValue)
      .then(response=> this._setTours(response))
      .catch(this._errorHandler);
  }

  private _errorHandler(error:any):void{
    console.log("error while getting jobs");
    
  }

  private _setTours(tours:Tour[]):void{
    this.tours= tours
  }

   save(){
    console.log(this.newTour);
    
     this.toursServices.addTour(this.newTour)
     .then(response=>console.log("Job Added"))
     .catch(this._errorHandler);
     
   }

   previous():void{
     
    if(this.offset_default<0){
      this.offset_default = 0
    }else{
      this.offset_default = this.offset_default-4
    }
    this.toursServices.getTours(this.txtquery,this.offset_default,this.selectedValue)
      .then(response=> this._setTours(response))
      .catch(this._errorHandler);

   }

   Next(){

    if(this.offset_default<0){
      this.offset_default = 0
    }else{
      this.offset_default= this.offset_default+4
    }

    this.toursServices.getTours(this.txtquery,this.offset_default,this.selectedValue)
      .then(response=> this._setTours(response))
      .catch(this._errorHandler);

   }

   selectChangeHandler (event: any) {
    //update the ui
    this.selectedValue = event.target.value;
  }


}
