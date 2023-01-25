import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //server call to register account and return response to register component
  register(uname:any,acno:any, pswd:any){
    const body={
      uname,
      acno,
      pswd
    }
  return this.http.post('http://localhost:3000/register',body)
  }
  //login
  login(acno:any,pswd:any){
    const body={
      acno,
      pswd
    }
      //server call to login account and return response to login component
      return this.http.post('http://localhost:3000/login',body)

  }

  //function for appending token to the http header
  appendToken(){
      //fetch token from local storage
    const token=localStorage.getItem("token")||''
    //create http header
   let headers = new HttpHeaders()//object creatation for the class HttpHeader

   if(token){
    //append token inside http headers
    headers= headers.append('access-token',token)
    options.headers= headers
 }
  
   return options
    }
    
    
  


  //get balance
  getBalance(acno:any){
    return this.http.get('http://localhost:3000/getBalance/'+acno,this.appendToken())
    //getBalance/acno=>acno -parameter, this type of fn call is called path parameter call
  }

  //deposit
  deposit(acno:any,amount:any){
const body={
  acno,
  amount
}
 return this.http.post('http://localhost:3000/deposit',body,this.appendToken())
  }
  //if we use get method instead of put we cannot send body, for get method has no body, we have to use function overloading, above getBalance() is an example


  //fund transfer api
  fundTransfer(toAcno:any,pswd:any,amount:any){
    const body= {
      toAcno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/fundTransfer',body,this.appendToken())
  }
  //all-transactions api
  getAllTransactions(){
    return this.http.get('http://localhost:3000/all-transactions',this.appendToken())
  }

  //account deletion api
  deleteAccount(acno:number){
    return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())

  }

}
