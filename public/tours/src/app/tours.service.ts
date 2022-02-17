import { Injectable } from '@angular/core';
import {Tour} from './classes/tour'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  

  private baseUrl:string = "http://localhost:4000/api/"
  constructor(private http:HttpClient) { }

  getTours(qTxt:string,offset:number,count:number): Promise<Tour[]>{
    const url: string = this.baseUrl + "tours"+qTxt+offset
    return this.http.get(url).toPromise()
            .then (response => response as Tour[])
            .catch(this._handleError)
  }

  private _handleError(err:any):Promise<any>{
    console.log("service error",err);
    return Promise.reject(err.message||err)
    
  }

  getTour(id:String):Promise<Tour>{
    const url: string = this.baseUrl+"tours/" + id;
    return this.http.get(url).toPromise()
            .then (response => response as Tour)
            .catch(this._handleError)
  }

  deleteTour(id:string):Promise<Tour>{
    const url: string = this.baseUrl+"tours/" + id;
    return this.http.delete(url).toPromise()
            .then (response => console.log("Tour Deleted"))
            .catch(this._handleError)
  }

  addTour(newTour:Tour):Promise<Tour>{
    const url: string = this.baseUrl+"tours" ;
    return this.http.post(url,{attraction:newTour.attraction,country:newTour.country,year:newTour.year}).toPromise()
            .then (response => console.log("Tour Added"))
            .catch(this._handleError)
  }

  updateTour(newTour:Tour,id:String):Promise<Tour>{
    const url: string = this.baseUrl+"tours/"+id ;
    return this.http.put(url,{attraction:newTour.attraction,country:newTour.country,year:newTour.year}).toPromise()
            .then (response => console.log("Tour Updated"))
            .catch(this._handleError)
  }
}
