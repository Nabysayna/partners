import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


export class TntResponse{
  id_abonnement: number ;
  prenom: string ;
  nom: string ;
  tel: string ;
  adresse: string ;
  region: string ;
  city: string ;
  cni: string ;
  n_chip : string ;
  n_carte : string ;
  date_abonnement: string ;
  duree : string ;
  id_typeabonnement : string ;
  montant : number ;
  id_operateur : number;
  etat : number ;
  id_activateur: number ;
  date_activation: string;
  etat_reclamation : string;
  datefinactivation : string ;
}


@Injectable({
  providedIn: 'root'
})
export class TntService {

//  private link = "https://mysentool.pro/index.php";

  private link = "https://sentool.bbstvnet.com/index.php";
 

  private headers = new Headers();
  public responseJso : any ;
  public resp : string ;
  public responseJsoFWS : TntResponse[] ;


  constructor(private http:Http) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getTarifTntAbon(data:any){
    let url = this.link+"/tf-sen/tntAbon";
    let datas = JSON.stringify({token:"460031cada212bed6e8e6304db28bbfcc66d03715", data:data});
    let params = 'params='+datas;
    return this.http.post(url, params, {headers:this.headers}).pipe(map(res => res.json()));
  }

  public checkNumber(token : string, chipOrCardNum: string) : Promise<TntResponse> {
    let params="params="+JSON.stringify({token:token,numeroCarteChip:chipOrCardNum});
    console.log(params);
    let link=this.link+"/apitnt/checkNumber";
    console.log("TOKEN /// ");
    console.log(link);
    return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).pipe(map(res =>res.json())).subscribe(data =>{
            resolve(JSON.parse(data));
        });
    });
  }

  public abonner(token:string, prenom:string, nom:string, tel:string, cni:string, numerochip:string, numerocarte:string, duree:number, typedebouquet:number) : Promise<any> {
    let montant : number = 0 ;
    if(typedebouquet==1) montant = 5000;
    if(typedebouquet==2) montant = 3000;
    if(typedebouquet==3) montant = 8000;
    montant = duree*montant ;

    let reEspParams = {token:token, prenom:prenom, nom:nom, tel:tel, adresse:'', region:'', city:'', cni:cni, numerochip:numerochip, numerocarte:numerocarte, duree:duree, typedebouquet:typedebouquet, montant:montant} ;
    let link=this.link+"/apitnt/abonner";
    console.log(link);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).pipe(map(res =>{ console.log(res); res.json()})).subscribe(data =>{
          resolve(data);
      });
    });
}

}

 