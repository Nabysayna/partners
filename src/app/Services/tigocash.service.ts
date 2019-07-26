import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class TigocashService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
//  private link = "https://sentool.bbstvnet.com/sslayer/index.php";

//  private link = "https://mysentool.pro/index.php";
  private link = "https://sentool.bbstvnet.com/index.php";

  private headers=new Headers();
  private token:string =  "44387df398822d9f4076a390bf3566eb4c1b10606";
  public datas:any;


  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public requerirControllerTC(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requestParam : requete, tokenParam : this.token});
    let link=this.link+"/tc-sen/requerirControllerTC";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public verifierReponseTC(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requestParam : requete, tokenParam : this.token, cacheDisabler : Date.now()});
    let link=this.link+"/tc-sen/verifierReponseTC";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public demanderAnnulationTC(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requestParam : requete, tokenParam : this.token});
    let link=this.link+"/tc-sen/demanderAnnulationTC";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public retraitaveccodetc(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requestParam : requete, tokenParam : this.token});
    let link=this.link+"/tc-sen/demanderAnnulationTC";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

}
