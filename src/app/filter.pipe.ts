import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
//  transform(allTransactions:[],searchKey:string,propName:string)
    //transform(array_name need to be filtered, based on which key the filtering has to be done,based on which property the array has to be searched): returning array{}

    
  transform(allTransactions:[],searchKey:string,propName:string): any [] {
    const result:any=[]
    if(!allTransactions || searchKey=='' || propName==''){
      return allTransactions
    }
    allTransactions.forEach((item:any)=>{
      if(item[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
