import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

import * as sha1 from 'js-sha1';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  private link = "https://sentool.bbstvnet.com/index.php"; 

  private headers=new Headers();

  public datas:any;


  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
   }

   
  login(data:any){
    let url = this.link+"/auth-sen/authentification";
    let datas = JSON.stringify({login:data.login, pwd: sha1(data.pwd) });
    let params = 'params='+datas;
    console.log(params) ;
    return this.http.post(url,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return JSON.parse(res['_body']) } ).catch(error => {console.log(error);return 'bad' });
  }

  authentificationPhaseTwo(data:any){
    let url = this.link+"/auth-sen/authentificationPhaseTwo";
    let datas = JSON.stringify({tokentemporaire:data.tokentemporaire});
    let params = 'params='+datas;
    console.log(params) ;

    return this.http.post(url,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return JSON.parse(JSON.parse(res['_body']) ) } ).catch(error => {console.log(error);return 'bad' });
  }


  loggout(){
    let url = this.link+"/auth-sen/deconnexion";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, hdeconnexion:"345"});

    let params = 'params='+datas;

    return this.http.post(url,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return JSON.parse(JSON.parse(res['_body']) ) } ).catch(error => {console.log(error);return 'bad' });
  }


  inscription(data:any){
    let url = this.link+"/auth-sen/inscription";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this.http.post(url,params,{headers:this.headers}).toPromise().then( res => {
      console.log(res);
      return JSON.parse(res['_body']) ;
      } ).catch(error => {
      console.log(error);
      return 'bad' 
      });

  }



}
