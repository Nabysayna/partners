import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import * as sha1 from 'js-sha1';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private link = "https://sentool.bbstvnet.com/index.php"; 

  private headers=new Headers();

  private token : string  ;

  public datas:any;

  constructor(private http:Http) {
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

  checkCautionTNT(): Promise<any>{
    this.token = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

    let url = "http://apitnt.bbstvnet.com/index.php/prod/apiwizall/tntpartenaire/getSolde";
    console.log(this.headers);
    
    let datas = JSON.stringify({});

    let params = 'requestParam='+datas;

    return this.http.post(url,params,{headers:this.headers}).toPromise().then( res => {
      return JSON.parse(res['_body']) ;
    } ).catch(error => {
        console.log(error);
        return 'bad' 
    });

  }

  checkCaution(): Promise<any>{
    this.token = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

    let url = this.link+"/utils-sen/checkCaution";

    let datas = JSON.stringify({token:this.token});

    let params = 'requestParam='+datas;

    return this.http.post(url,params,{headers:this.headers}).toPromise().then( res => {
      return JSON.parse(res['_body']) ;
    } ).catch(error => {
        console.log(error);
        return 'bad' 
    });

  }


}
