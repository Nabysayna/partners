import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bbspipe'
})
export class BbspipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
   if(!items) return [];
   if(!searchText) return items;
   searchText = searchText.toLowerCase();
  if(!this.isNumber(searchText)){
   return items.filter( it => {
     if(searchText.indexOf('-')!=-1){
        return it.date.includes(searchText);
     }else{
      return it.prenom.toLowerCase().includes(searchText);
     }
    });
   
  }else{
      return items.filter( it => {
        return it.telephone.includes(searchText);
      });
  }
   }
   isNumber(n:string):boolean{
    let num=n.split("");
    for(let j=0;j<=num.length;j++){
      if(!this.isChifre(num[j])){
        return false;
      }
    }
    return true;
   }
   isChifre(c):boolean{
     let tab=["0","1","2","3","4","5","6","7","8","9"];
     for(let i=0;i<=tab.length;i++){
       if(tab[i]==c){
         return true;
       }
     }
    return false;
   }
}
