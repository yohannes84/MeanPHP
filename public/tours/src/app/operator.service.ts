import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operator } from './classes/operator';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  private baseUrl:string = "http://localhost:4000/api/"
  constructor(private http:HttpClient) { }

  getOperators(id:String): Promise<Operator[]>{
    const url: string = this.baseUrl + "tours/"+id+"/operator";
    return this.http.get(url).toPromise()
            .then (response => response as Operator[])
            .catch(this._handleError)
  }

  private _handleError(err:any):Promise<any>{
    console.log("service error",err);
    return Promise.reject(err.message||err)
    
  }

  getOperator(id:String,pid:String):Promise<Operator>{
    const url: string = this.baseUrl+"tours/" + id+"/operator/"+pid;
    return this.http.get(url).toPromise()
            .then (response => response as Operator)
            .catch(this._handleError)
  }

  deleteOperator(id:String, pid:String):Promise<Operator>{
    const url: string = this.baseUrl+"tours/"+id+"/operator"+pid;
    return this.http.delete(url).toPromise()
            .then (response => console.log("Operator Deleted"))
            .catch(this._handleError)
  }

  addOperator(newOperator:Operator, id:String):Promise<Operator>{
    const url: string = this.baseUrl+"tours/"+id+"/operator";
    return this.http.post(url,{name:newOperator.name,rating:newOperator.rating}).toPromise()
            .then (response => console.log("Operator Added"))
            .catch(this._handleError)
  }

  updateOperator(updatedOperator:Operator,tid:String, pid:String):Promise<Operator>{
    const url: string = this.baseUrl+"tours/"+tid+"/operator/"+pid ;
    return this.http.put(url,{name:updatedOperator.name,rating:updatedOperator.rating}).toPromise()
            .then (response => console.log("Tour Updated"))
            .catch(this._handleError)
  }
}
