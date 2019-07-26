import { Component ,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TntService } from 'src/app/Services/tnt.service';
import { PostCashService } from 'src/app/Services/postcash.service';
import { WizallService } from 'src/app/Services/wizall.service';
import { OrangemoneyService } from 'src/app/Services/orangemoney.service';
import { TigocashService } from 'src/app/Services/tigocash.service';
import { CanalService } from 'src/app/Services/canal.service';
import { ExpressocashService } from 'src/app/Services/expressocash.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {Gestionreporting, GestionreportingData, Servicepoint} from "src/app/Services/gestionreporting.service";
import { AuthentificationService } from "src/app/Services/authentification.service";
import { UtilsService } from 'src/app/Services/utils.service';
import { PipeService } from 'src/app/Services/pipe.service';
import { SuperviseurService } from 'src/app/Services/superviseur.service';

import * as sha1 from 'js-sha1';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  toconnect = true ;
  connected = false ;
  etapetnt=1;
  numero:any;
  nom:any;
  prenom:any;
  tel:any;
  fakevalues : any = false ;
  fakevalues2 : any = false ;
  phase : any = 1 ;
  code : any ;
  username : any ;

  solde : any = 0 ;

  login : any ;
  pwd : any ;

  numeroChip:any;
  numeroCarte:any;
  nombreDeMois:any;
  typeDeBouquet:any;
  numeroassocie:any;
  OrangeMoneyRadio:any;
  tigocashRadio:any;
  emoneyRadio:any;
  postcashRadio:any;
  wizallRadio:any;
  cni:any;
  singleTntWS:any;
  loading=false;
  registloading=false ;
  erreur:any;
  modalRef: BsModalRef;
  montant:any;
  token = "460031cada212bed6e8e6304db28bbfcc66d03715";

  baseToken : any ;

  numAb : any ;
  nomAb : any ;
  prenomAb : any ;
  telAb : any ;
  adress : any ;
  formuleAb : any ;
  matAb : any ;
  montantNet : any ;
  Bouquet : any ;
  filtre : any ;


  codecreation : any ;
  prenomclient : any ;
  nomclient : any ;
  emailpoint : any ;
  telpoint : any ;
  adressepoint : any ;
  regionpoint : any ;


  listeBouquet =[
    {libelle:'Date à date Access'},
    {libelle:'Date à date Evasion'},
    {libelle:'Date à date ESSENTIEL Plus'},
    {libelle:'Date à date Les Chaines canal Plus et Access'},
    {libelle:'Date à date Les Chaines canal Plus et Evasion'},
    {libelle:'Date à date Tout Canal Plus'},
  ] ;

  tntloading =false; 


  constructor(private modalService: BsModalService, public tntCaller:TntService,private _postCashService: PostCashService, private _tntService:TntService, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private authentificationService:AuthentificationService, private _canalService:CanalService, private _gestionreportingService : Gestionreporting, private _utilsService : UtilsService ) {}
 
  ngOnInit (){
    this.tntloading = undefined;
    this.externalUrl();
    this.toconnect = true ;

  }



  getReport(){
    this.loading = true ;
    var obj = new Date() ;

    var Base = new Date(2019, obj.getMonth()-1, 1) ;
    var Arr = new Date(2019, obj.getMonth()+1, 1) ;

    let dateAnte = Base.toJSON().split("T",2)[0];
    this.selectionintervalledateinit = dateAnte;


    let datePost = Arr.toJSON().split("T",2)[0];
    this.selectionintervalledatefinal = datePost;

    this._gestionreportingService.reportingdate({idpdv:10, type:'intervalle', infotype:this.selectionintervalledateinit+" "+this.selectionintervalledatefinal})
      .then(
        data => {
          this.gestionreporting = data;
          this.loading = false ;
        },
        error => {
          console.log(error)
          this.loading = false ;
        }) ;


    this._utilsService.checkCaution()
      .then(
        data => {
          this.solde = data;
        },
        error => {
          console.log(error)
          this.loading = false ;
        }) ;


  }


  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }


  public gestionreporting:GestionreportingData[];
  selectionjour:string;
  selectionintervalledateinit:string;
  selectionintervalledatefinal:string;


  reinitialiser (){
    this.montant=undefined;
    this.cni=undefined;
    this.numero=undefined;
    this.nom=undefined;
    this.prenom=undefined;
    this.tel=undefined;
    this.numeroChip=undefined;
    this.numeroCarte=undefined;
    this.nombreDeMois=undefined;
    this.typeDeBouquet=undefined;
    this.numeroassocie=undefined;
    this.OrangeMoneyRadio=undefined;
    this.tigocashRadio=undefined;
    this.emoneyRadio=undefined;
    this.postcashRadio=undefined;
    this.wizallRadio=undefined;
    this.numero=undefined;

    this.codecreation = undefined ;
    this.prenomclient = undefined ;
    this.nomclient = undefined ;
    this.emailpoint = undefined ;
    this.telpoint = undefined ;
    this.adressepoint = undefined ;
    this.regionpoint = undefined ;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalCanal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }  

  //------------------- TNT -----------------------

  infoNumeroTnt(){
     console.log(this.numero);
     this.tntloading = true ;
     this.tntCaller.checkNumber(this.token, this.numero.toString()).then( response => {
         this.singleTntWS = response ;
         console.log(this.singleTntWS);
         this.nom = this.singleTntWS.nom ;
         this.prenom = this.singleTntWS.prenom ;
         this.tel = Number(this.singleTntWS.tel);
         this.numeroChip = Number(this.singleTntWS.n_chip) ;
         this.numeroCarte = Number(this.singleTntWS.n_carte) ;
         this.cni = this.singleTntWS.cni;
 
         if (this.singleTntWS.id_typeabonnement=="1")
           this.singleTntWS = "Maanaa";
         if (this.singleTntWS.id_typeabonnement=="2")
           this.singleTntWS = "Boul Khool";
         if (this.singleTntWS.id_typeabonnement=="3")
           this.singleTntWS = "Maanaa + Boul Khool";
 
         this.etapetnt=2;
 
         this.tntloading = false ;
     }).catch ( () => {
        this.erreur = "votre  connexion  est instable ou numero incorrecte";
        this.tntloading = false;
     });
  }

  validerpaiementTnt(){
      // this.retirerOM();
      //this.cashOutWizall();
      let operateur = this.OrangeMoneyRadio | this.tigocashRadio | this.postcashRadio | this.wizallRadio | this.emoneyRadio;
      
      console.log(operateur);

      switch(operateur){
            case 0:
                this.erreur = "Vous devez choisir un mode paiement";
                break;
          case 1:
                //OM
                this.retirerOM();
                break;

          case 2:
                //TC
                this.retraitTc();
                break;

          case 3:
                //e-m
                // this.faireretraitsimple();
                break;

          case 4:
                //post
                // this.validationretraitespece();
                break;
                
          case 5:
                //wIZALL
                // this.cashOutWizall();
                break;
      }
  }


  infoNumeroCanal(){
     console.log(this.numero);
     this.tntloading = true ;

    this._canalService.recherche(this.numero.toString()).then(res =>{
      let numFile = res['_body'].trim();
      console.log(res['_body']);
      this.loading=true;
      let periodicVerifier = setInterval(()=> this._canalService.resultRecherche(numFile).then(res =>{ 

      let result=res['_body'].trim();

      if(result.indexOf("-1")!=0){
        clearInterval(periodicVerifier) ;
        console.log("Resultat de la rechercher : "); 
        console.log(result);

        this.numAb = result.split('[')[0];
        this.nomAb = result.split('[')[2];
        this.prenomAb = result.split('[')[3];
        this.numAb ; //this.telAb = result.split('[')[7];
        this.formuleAb = result.split('[')[8];
        this.matAb = result.split('[')[11];

        this.loading=false;
 
        this.etapetnt=2;
        this.tntloading = false ;
      }

    }), 2000);
    }).catch ( () => {
        this.erreur = "votre  connexion  est instable ou numero incorrecte";
        this.tntloading = false;
     }); 

  }





  tarifTntAbon (){    
   this.payerCanal() ;
  }

  validrecrutement(){
    let infosClient = {'operation':'CANAL Recrutement', 'nomclient': 'CAMPAGNE '+this.nomAb, 'prenom' : 'CAMPAGNE '+this.prenomAb, 'tel': this.telAb, 'numAbo': this.numAb, 'numDec' : this.matAb, 'numCarte' : this.matAb, 'formule': this.Bouquet, 'montant' : this.montantNet, 'nbreMois' : this.nombreDeMois, 'charme' : '', 'pvd' : '', 'ecranII' : ''} ;

    
    let infosToSend = JSON.stringify(infosClient) ;

    this.tntloading = true ;

    this._canalService.payer(infosToSend).then(response =>{
      console.log(response._body);
      if(response._body==1){
          this.tntloading = false ;
          this.etapetnt=4;
          let nbTransact = Math.floor(Date.now() / 1000) ;
      }else{
          this.tntloading = false ;
          this.etapetnt=0;
      }
    });
  }

  validnabon(){
    var typedebouquet : number ;
    if(this.typeDeBouquet == "Maanaa")
      typedebouquet=1;
    if(this.typeDeBouquet == "Boul khool")
      typedebouquet=2;
    if(this.typeDeBouquet == "Maanaa + Boul khool")
      typedebouquet=3;

    this.loading = true ;

    this.tntCaller.abonner(this.token, this.prenom,this.nom, this.tel,this.cni, this.numeroChip, this.numeroCarte, this.nombreDeMois, this.typeDeBouquet).then( response =>
      {
        this.loading = false;
        let montant:number = 0;
        let typedebouquet = "" ;

        if(response != undefined){
            response = JSON.parse(response) ;
            if(response.response=="ok"){
    
            }else{
              //  this..etat=true;
              //  this..load='terminated';
              //  this..color='red';
              //  this..errorCode='0';
          }
        }
        else{
            console.log("variable de retoure 'response' indefinie !");
            this.erreur = "votre  connexion  est instable";
            this.tntloading = false;
        }

    }).catch(
      () => {
         this.erreur = "votre  connexion  est instable";
         this.tntloading = false;
       }
    );

    this.reinitialiser();
  }


 //---------------------- les retraits   --------------------------

 nbtour:number = 0;
 
 retraitTc(){
  this.nbtour = 0;
  let requete = "2/"+this.numeroassocie+"/"+ this.montant ;

  this.numeroassocie = undefined;
  this.montant  = undefined;
  this.erreur   = undefined;

  console.log(requete);
  this.tntloading = true;
  this._tcService.requerirControllerTC(requete).then( resp => {
    if (resp.status==200){

      console.log("For this 'retrait', we just say : "+resp._body) ;

      if(resp._body.trim()=='0'){
        this.erreur = this.retrieveOperationInfo(3,'0');

      }else
          if(resp._body.match('-12')){
            this.erreur = this.retrieveOperationInfo(3,'-12');
          }
          else
            this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("Inside verifier retrait: "+donnee) ;
              if(donnee=='1'){
                this.etapetnt=4;
                this.tntloading = false;
                this.reinitialiser ();
              }
              else{
                if(donnee!='-1'){
                  this.erreur = this.retrieveOperationInfo(3,donnee);
                }else{
                  let periodicVerifierTCRetirer = setInterval(()=>{
                    console.log("periodicVerifierTCRetirer : "+this.nbtour) ;
                    this.nbtour = this.nbtour + 1 ;
                    this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      console.log("Inside verifier retrait: "+donnee) ;
                      if(donnee=='1'){
                        this.etapetnt=4;
                        this.tntloading = false;
                        this.reinitialiser ();
                         clearInterval(periodicVerifierTCRetirer) ;
                      }
                      else{
                        if(donnee!='-1'){
                          this.erreur = this.retrieveOperationInfo(3,donnee);
                          this.etapetnt=1;
                          this.tntloading = false;
                          clearInterval(periodicVerifierTCRetirer) ;
                        }
                        if(donnee=='-1' && this.nbtour>=100){
                          this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                            console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                            let donnee=rep._body.trim().toString();
                            if(donnee=="c"){
                                this.erreur = this.retrieveOperationInfo(3,donnee);
                                this.etapetnt=1;
                                this.tntloading = false;
                                clearInterval(periodicVerifierTCRetirer) ;
                            }
                          }) ;
                        }
                      }
                    });
                  },2000);
                }
              }
            });
    }
    else{
      console.log("error") ;
      this.erreur = "Votre connexion est instable";
      this.tntloading = false
    }
  }).catch(
    () => {
       this.erreur = "Votre connexion est instable";
       this.tntloading = false;
     }
  );
}

 retirerOM(){
    console.log("*******************************");
    this.nbtour = 0;
    let requete = "2/"+this.numeroassocie+"/"+ this.montant;

    this.numeroassocie = undefined;
    this.montant  = undefined;

    console.log(requete);
    this.tntloading =true;
    this.erreur =  undefined;

    this._omService.requerirControllerOM(requete).then( resp => {
      console.log(resp);
      if (resp.status==200){

        console.log("For this 'retrait', we just say : "+resp._body) ;

        if(resp._body.trim()=='0'){
            this.erreur = this.retrieveOperationInfo(2,'0');
            this.tntloading =  false;
        }else
            if(resp._body.match('-12')){
              this.erreur = this.retrieveOperationInfo(2,'-12');
              this.tntloading =  false;
            }
            else
              this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                let donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                  this.etapetnt=4;
                  this.tntloading = false;
                  this.reinitialiser ();
                }
                else{
                  if(donnee!='-1'){
                    this.erreur = this.retrieveOperationInfo(2,donnee);
                    this.tntloading =  false;
                  }else{
                      let periodicVerifierOMRetirer = setInterval(()=>{
                        this.nbtour = this.nbtour + 1 ;
                      this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                        let donnee=rep._body.trim().toString();
                        console.log("Inside verifier retrait: "+donnee) ;
                        if(donnee=='1'){
                          this.etapetnt=4;
                          this.tntloading = false;
                          this.reinitialiser ();
                          clearInterval(periodicVerifierOMRetirer) ;
                        }
                        else{
                          if(donnee!='-1'){
                              this.erreur = this.retrieveOperationInfo(2,donnee);
                              this.tntloading =false;   
                              clearInterval(periodicVerifierOMRetirer) ;
                          }
                            if(donnee=='-1' && this.nbtour>=75){
                              this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                                let donnee=rep._body.trim().toString();
                                if(donnee=="c"){
                                  this.erreur = this.retrieveOperationInfo(2,donnee);
                                  this.tntloading =false;
                                  clearInterval(periodicVerifierOMRetirer) ;
                                }
                              });
                            }
                        }
                      });
                      },2000);
                  }
                }
              });
      }
      else{
        console.log("error") ;
            this.erreur = "votre  connexion  est instable";
            this.tntloading = false;
        }
    }).catch(
        () => {
            this.erreur = "votre  connexion  est instable";
            this.tntloading = false;
          }
    );

}
//---------------  wizall ---------------
cashOutWizall(){
  console.log('cashOutWizall');
  this.tntloading = true;
  this._wizallService.intouchCashout(this.numeroassocie,this.montant).then( response =>{
    console.log("*************************") ;
    if(typeof response !== 'object') {
      this.erreur = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
    }
    else if(response.commission!=undefined){
      this.erreur = undefined;
      this.etapetnt=4;
      this.tntloading = false;
      this.reinitialiser ();
    }
    else{
      this.erreur = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
    }
    this.tntloading = false;
  }).catch(response => {
    this.erreur = response;
    this.tntloading = false;
  });
}

infoRetraitsimple:any;
//--------------e-money--------------------
public faireretraitsimple(){
  this.tntloading = true;
  this.erreur = undefined;

  this.expressocashwebservice.cashout(this.numeroassocie, this.montant).then(expressocashwebserviceList => {
     console.log(expressocashwebserviceList);
    if(!expressocashwebserviceList.match("cURL Error #:")){
      this.infoRetraitsimple = JSON.parse(JSON.parse(expressocashwebserviceList));
      if(this.infoRetraitsimple.status==0){
        this.erreur = undefined;
        this.etapetnt=4;
        this.tntloading = false;
        this.reinitialiser ();
      }
      else{
        this.erreur = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
      }
    }
    else{
      this.erreur = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
    }
    this.tntloading = false;
  }).catch(
    () => {
       this.erreur = "votre  connexion  est instable";
       this.tntloading = false;
     }
  );
}

//--------------PostCash -----------------

    validationretraitespece(){
      console.log("validationretraitespeceaveccarte");
      this.erreur =  undefined;
      this.loading = true ;
      this.erreur = false;
      this._postCashService.retraitespece('00221'+this.numeroassocie+'',''+this.montant).then(postcashwebserviceList => {
      this.loading = false ;
      postcashwebserviceList = JSON.parse(postcashwebserviceList) ;
      console.log(postcashwebserviceList);
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){

      }else{
        this.erreur = postcashwebserviceList.errorMessage;
      }
    }).catch(() => {
        this.erreur = "Votre  connexion  est instable";
        this.tntloading = false;
      });
    }

    externalUrl(){
    let
    url,
    num,
    regexp;

    url =  window.location.href;
    regexp = /[0-9]{9}/gi;

    num = url.match(regexp);

    if(num!=null){
      this.numero = num[0];
      this.infoNumeroTnt();
    }
    }

    retrieveOperationInfo(operateur,errorCode) : string{

        /* OM */
         if(operateur==2 ){
    
            if (errorCode=='r')
              return "Vous venez d'effectuer la même opèration sur le même numéro." ;
    
            if (errorCode=='c')
              return "Opèration annulée. La requête n'est pas parvenue au serveur. Veuillez recommencer." ;
    
            if (errorCode=='0')
              return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
    
            if (errorCode=='-2')
              return "Vous avez atteint le nombre maximum de transactions par jour en tant que beneficiaire" ;
            if (errorCode=='-3')
              return "Le solde de votre compte ne vous permet pas d'effectuer cette opèration" ;
            if (errorCode=='-4')
              return "Le beneficiaire a atteint le montant maximum autorisé par mois" ;
            if (errorCode=='-5')
              return "Le montant maximum cumulé de transactions par semaine en tant que beneficiaire a ete atteint par le client" ;
            if (errorCode=='-6')
              return "Le destinataire n'est pas un client orangemoney" ;
            if (errorCode=='-7')
              return "Probléme de connexion ou code IHM invalide. Veuillez réessayer!" ;
            if (errorCode=='-8')
              return "Le client a atteint le nombre maximum de transactions par semaine en tant que beneficiaire" ;
            if (errorCode=='-9')
              return "Le client a atteint le nombre maximum de transactions par mois en tant que beneficiaire" ;
      
            if (errorCode=='-12')
              return "Service actuellement indisponible. Veuillez réessayer plus tard." ;
    
            if (errorCode=='-13')
              return "Le code de retrait saisi est incorrect. Veuillez recommencer!" ;
    
           return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
        }
    
        /* TC */
         if(operateur==3 ){
    
            if (errorCode=='r')
              return "Vous venez d'effectuer la même opèration sur le même numéro." ;
    
            if (errorCode=='c')
              return "Opèration annulée. La requête n'est pas parvenue au serveur. Veuillez recommencer." ;
    
            if (errorCode=='0')
              return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
    
            if (errorCode=='-2')
              return "Numéro Invalide." ;
            if (errorCode=='-3')
              return "Le compte de l'utilisateur ne dispose pas de permissions suffisantes pour recevoir un dépot." ;
            if (errorCode=='-4')
              return "Le beneficiaire a atteint le montant maximum autorisé par mois" ;
            if (errorCode=='-5')
              return "Le montant maximum cumulé de transactions par semaine en tant que beneficiaire a ete atteint par le client" ;
            if (errorCode=='-6')
              return "Le destinataire n'est pas un client orangemoney" ;
            if (errorCode=='-7')
              return "Probléme de connexion ou code IHM invalide. Veuillez réessayer!" ;
            if (errorCode=='-8')
              return "Vous avez atteint le nombre maximum de transactions par semaine en tant que beneficiaire" ;
            if (errorCode=='-9')
              return "Vous avez atteint le nombre maximum de transactions par mois en tant que beneficiaire" ;
      
            if (errorCode=='-12')
              return "Service actuellement indisponible. Veuillez réessayer plus tard." ;
    
            if (errorCode=='-13')
              return "Le code de retrait saisi est incorrect. Veuillez recommencer!" ;
    
           return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
        }
        
        if(operateur==4 ){
    
            if (errorCode=='0')
              return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
           return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
        }
    
        /* WIZALL */
        if(operateur==6 ){
          if (errorCode=='-12' || errorCode==-12)
            return "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client.";
          else if (errorCode=='-11' || errorCode==-11)
            return "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client." ;
          else if (errorCode=='-1' || errorCode==-1)
            return "Impossible de se connecter au serveur du partenaire. Merci de réessayer plus tard." ;
          else if (errorCode=='500' || errorCode==500)
            return "Une erreur a empêché le traitement de votre requête. Réessayez plus tard ou contactez le service client." ;
          else if (errorCode=='400' || errorCode==400)
            return "Facture dèja payée." ;
          else if (errorCode && (typeof errorCode == 'string'))
            return errorCode;
          return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
        }
    
        /* EXPRESSO */
        if(operateur==7 ){
    
          if (errorCode=='-1' || errorCode=='1')
            return "Impossible de se connecter au serveur du partenaire. Merci de réessayer plus tard." ;
          if (errorCode=='2')
            return "Cette requête n'est pas authorisée" ;
          if (errorCode=='51')
            return "Le numéro du destinataire n'est pas authorisé à recevoir de transfert." ;
          if (errorCode=='3')
            return "Numéro de téléphone invalide." ;
          if (errorCode=='2')
            return "Cette requête n'est pas authorisée" ;
          if (errorCode=='7')
            return "Votre compte a été verrouillé, contactez le service client." ;
          if (errorCode=='9')
            return "Votre compte est à l'état inactif." ;
    
          return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
        }
    
        /* FACTURIER */
        if(operateur==8 ){
          if (errorCode=='-12' || errorCode==-12)
            return "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client.";
          else if (errorCode=='-11' || errorCode==-11)
            return "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client." ;
          else if (errorCode=='-1' || errorCode==-1)
            return "Impossible de se connecter au serveur du partenaire. Merci de réessayer plus tard." ;
          else if (errorCode && (typeof errorCode == 'string')) return errorCode;
          return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
        }
    }

    getMontant(){

    console.log("Get the amount") ;
    
    this.montantNet = 0;

    if(this.Bouquet == 'Date à date Access'){
      this.montantNet = this.montantNet + 5000 ;
    }else if(this.Bouquet == 'Date à date Evasion')  {
      this.montantNet = this.montantNet + 10000 ;
    }else if(this.Bouquet == 'Date à date ESSENTIEL Plus')  {
      this.montantNet = this.montantNet + 12000 ;
    }else if(this.Bouquet == 'Date à date Les Chaines canal Plus et Access')  {
      this.montantNet = this.montantNet + 15000 ;
    }else if(this.Bouquet == 'Date à date Les Chaines canal Plus et Evasion')  {
      this.montantNet = this.montantNet + 20000 ;
    }else if(this.Bouquet == 'Date à date Tout Canal Plus')  {
      this.montantNet = this.montantNet + 40000 ;
    }else if(this.Bouquet == 'Date à date Prestige')  {
      this.montantNet = this.montantNet + 30000 ;
    }
    this.montantNet = this.montantNet * this.nombreDeMois;
    }


    getMontantDec(){
      
      this.montantNet = 0;

      if(this.Bouquet == 'Date à date Access'){
        this.montantNet = this.montantNet + 5000 ;
      }else if(this.Bouquet == 'Date à date Evasion')  {
        this.montantNet = this.montantNet + 10000 ;
      }else if(this.Bouquet == 'Date à date ESSENTIEL Plus')  {
        this.montantNet = this.montantNet + 12000 ;
      }else if(this.Bouquet == 'Date à date Les Chaines canal Plus et Access')  {
        this.montantNet = this.montantNet + 15000 ;
      }else if(this.Bouquet == 'Date à date Les Chaines canal Plus et Evasion')  {
        this.montantNet = this.montantNet + 20000 ;
      }else if(this.Bouquet == 'Date à date Tout Canal Plus')  {
        this.montantNet = this.montantNet + 40000 ;
      }else if(this.Bouquet == 'Date à date Prestige')  {
        this.montantNet = this.montantNet + 30000 ;
      }
    }

  
    orangeNumberTest(numb:string){
        let  re= new RegExp("^7[7-8]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$");
        return re.test(numb);
    }


    tigoNumberTest (numb:string){
        let  re= new RegExp("^76[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$");
        return re.test(numb);
    }


    expressoNumberTest (numb:string){
      let  re= new RegExp("^70[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$");
      return re.test(numb);
    }


    numberTest (numb:string){
      let  re= new RegExp("^7[0768]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$");
      return re.test(numb);
    }

    authentificate(){ 
      this.loading = true ;
      this.authentificationService.login( {login: this.login, pwd: this.pwd} ).then(access=>
        {
          console.log(access) ;
          access = access.trim() ;

          if(access  != "false" && access.includes("ok#")){
            this.loading = false ;
            this.phase = 2 ;
            sessionStorage.setItem('headToken', access.split("#")[1].trim() );
          }else{
            console.log(access) ;
            this.fakevalues = true ;
            this.login = ''  ;
            this.pwd  = '' ;
            this.loading = false ;
          }
        });
    }

    authentificateBySMS(){
      console.log(this.code+"#"+sessionStorage.getItem('headToken')) ;
      console.log(sessionStorage.getItem('headToken')) ;

      this.loading = true ;
      this.authentificationService.authentificationPhaseTwo( {tokentemporaire:this.code+"#"+sessionStorage.getItem('headToken')} ).then(resp=>
        {
          console.log(resp) ;

          console.log(this.baseToken) ;

          if(resp.reponse==true && resp.authorizedApis.includes("zcp") ){
            this.baseToken = sessionStorage.getItem('headToken')+sha1(resp.baseToken+sha1("bay3k00_f1_n10un") );
            sessionStorage.setItem('currentUser', JSON.stringify({ username: resp.prenom, baseToken: this.baseToken, authorizedApis:resp.authorizedApis, accessLevel:resp.accessLevel, prenom:resp.prenom, nom:resp.nom, telephone:resp.telephone, firstuse:resp.firstuse}));
            
            this.username = resp.prenom ;

            this.loading = false ;

            this.toconnect = false ;
            this.connected = true ;

          }else{
            this.fakevalues2 = true ;
            this.loading = false ;
          }

        });
    }

    disconnect(){ 
      this.authentificationService.loggout().then(access=>
        {
          console.log(access) ;

          if(access  == 1){
            sessionStorage.removeItem('headToken');
            sessionStorage.removeItem('baseToken');
            window.location.reload() ;
          }else{
            sessionStorage.removeItem('headToken');
            sessionStorage.removeItem('baseToken');
             window.location.reload() ;
          }
        });
    }


    registerCustomer(){    
      let paramInscrpt = {'token': '234576TVG5@u_45RRFT', 'prenom':this.prenomclient, 'nom':this.nomclient, 'email':this.emailpoint+".ca", 'telephone':this.telpoint+"#"+this.codecreation, 'nometps':"-", 'nomshop':"-", adresse : JSON.stringify({'region':this.regionpoint, 'zone':"-", 'souszone':"-", 'address':this.adressepoint}), 'idcommercial':3 } ;

      this.registloading = true ;
      this.erreur = null; 

      console.log( "Nouvel Inscrit : "+JSON.stringify(paramInscrpt) ) ;

      this.authentificationService.inscription(paramInscrpt).then( retourserveur => {
        this.registloading = false ;
        console.log(retourserveur);

        if(retourserveur=="n-a"){
          this.erreur = "Erreur lors de la création. Revoyez les données saisies.";
        }
        if(retourserveur=="bad"){
          this.erreur = "Erreur lors de la création. Revoyez les données saisies.";
        }

        if(retourserveur=="ok"){
          this.erreur = "success";
          this.codecreation = undefined ;
          this.prenomclient = undefined ;
          this.nomclient = undefined ;
          this.emailpoint = undefined ;
          this.telpoint = undefined ;
          this.adressepoint = undefined ;
          this.regionpoint = undefined ;

        }
      });

    }


    payerCanal(){
      let infosClient = {'operation':'CANAL Réabonnement', 'nomclient': "CAMPAGNE"+this.nomAb, 'prenom' : "CAMPAGNE"+this.prenomAb, 'tel': this.numAb, 'numAbo': this.numAb, 'numDec' : this.matAb, 'numCarte' : this.matAb, 'formule': this.Bouquet, 'montant' : this.montantNet, 'nbreMois' : this.nombreDeMois, 'charme' : "", 'pvd' : "", 'ecranII' : ""} ;
      
      let infosToSend = JSON.stringify(infosClient) ;

      this.tntloading = true ;

      this._canalService.payer(infosToSend).then(response =>{
        console.log(response._body);
        if(response._body==1){
            this.tntloading = false ;
            this.etapetnt=4;
            //this.updateCaution();
            let nbTransact = Math.floor(Date.now() / 1000) ;
        }else{
            this.tntloading = false ;
            this.etapetnt=0;
        }
      });
    }


    print(service): void {
      let printContents, popupWin;
      printContents = document.getElementById('print'+service).innerHTML;
      popupWin = window.open('', '_blank', 'left=0,top=0,height=800,width=800,innerheight=800,innerwidth=1000');
      popupWin.document.open();
      popupWin.document.write(`
            <html>
                <head>
                    <style>
                        //........Customized style.......
                        
                    </style>
                </head>
                <body onload="window.print();window.close()">${printContents}<br/><h4 style="text-align: center"><u>Le guichetier</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Le client</u></h4><br/><br/><hr/><br/><p>${(new Date()).toLocaleDateString("fr-FR")}</p>${printContents}<br/><h4 style="text-align: center"><u>Le guichetier</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>Le client</u></h4></body>
            </html>`
      );
      popupWin.document.close();
    }




}
