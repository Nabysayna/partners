import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";


export class GestionreportingData{
  dateoperation:any;
  operateur:string;
  traitement:string;
  montant:number;
}

export class Servicepoint{
  nom:string;
  designations:string;
}



@Injectable({
  providedIn: 'root'
})
export class Gestionreporting {

  private link = "https://sentool.bbstvnet.com/index.php";

  private headers = new Headers();
  private token:string;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.token =    JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  }

  reportingdate(data:any){
    let url = this.link+"/gestionreporting-sen/reportingdate";

    this.token =    JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

    console.log(this.token) ;

    let datas = JSON.stringify({token:this.token, idpdv:data.idpdv, type:data.type, infotype:data.infotype});
    let params = 'params='+datas;
    
    console.log(params) ;

    return this._http.post(url,params,{headers:this.headers}).toPromise().then( res => {
      console.log(res);
      return JSON.parse(res['_body']) 
    } ).catch(error => {
      console.log(error);
      return [{}] ; 
      });
  }



}
