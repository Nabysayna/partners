import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import * as sha1 from 'js-sha1';


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
  private link1 = " http://apitnt.bbstvnet.com/index.php/prod/apiwizall/tntpartenaire";
  private headers = new Headers();
  private token:string;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('id', '2813');
    this.headers.append('token', this.getToken());
    this.headers.append('timestamp', this.tmestampe);
    
    this.token =    JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  }
  tmestampe;
  getToken(){
    this.tmestampe =new Date().getTime()
    return sha1(2813+this.token+this.tmestampe)
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
  reportingTNTdate(data:any){
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
