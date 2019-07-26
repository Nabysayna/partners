import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private link = "https://sentool.bbstvnet.com/index.php"; 

  private headers=new Headers();

  private token : string  ;

  public datas:any;

  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded') ;
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
