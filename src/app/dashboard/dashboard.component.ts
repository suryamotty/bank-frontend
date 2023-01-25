import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import party from "party-js";
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
logoutDiv:boolean=false
  user:string=''
currentAcno:Number=0
balance:Number=0
fundTransferSuccessMsg:string=''
fundTransferErrorMsg:string=''
//parent-child communication
acno:any="";
deleteConfirm:boolean=false;
deleteSpinnerDiv:boolean=false;



//dashboard- deposit-form group
depositForm =this.fb.group({
  //array
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
})


//for holding deposit messages
depositMsg:string=''


//dashboard- fund transfer-group
fundForm= this.fb.group({
 //array
 toAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],

  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

 
   pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
})

constructor(private api:ApiService,private fb: FormBuilder, private router:Router){
// console.log(this.depositForm.value.amount);

}


  ngOnInit(){
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')

    }
    if(localStorage.getItem("username")){
    this.user=localStorage.getItem("username")||''
  }
  
  }
  getBalance(){
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
      // console.log(this.currentAcno);

      //api for getting balance
      this.api.getBalance(this.currentAcno)
      .subscribe((result:any)=>{
        console.log(result);
        this.balance=result.balance
        
      })
    }
  }
  deposit(){
    if(this.depositForm.valid){
      // alert('valid form')
      let amount= this.depositForm.value.amount
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')

    this.api.deposit(this.currentAcno,amount)
    .subscribe(
      (result:any)=>{
      //success
    console.log(result);
    this.depositMsg=result.message  

    setTimeout(()=>{
      this.depositForm.reset()
      this.depositMsg=''
    },5000)
},
//error
(result:any)=>{
  this.depositMsg=result.error.message;
  
}
)
    }
    else{
      alert('Invalid Form')
    }
   
  }

  // showconfetti
  showconfetti(source:any){
    party.confetti(source)
  }

 fundTransfer(){
  if(this.fundForm.valid){
    // alert('Valid Form')
    let toAcno= this.fundForm.value.toAcno
    let pswd= this.fundForm.value.pswd
    let amount= this.fundForm.value.amount

    //make api call for fund transfer
    this.api.fundTransfer(toAcno,pswd,amount)
    .subscribe(
      //success
      (result:any)=>{
        this.fundTransferSuccessMsg= result.message
        setTimeout(()=>{
          this.fundForm.reset()
          this.fundTransferSuccessMsg=""
        },3000)
      },
      //client error
      (result:any)=>{
        this.fundTransferErrorMsg = result.error.message
        setTimeout(() => {
        this.fundTransferErrorMsg=""
        }, 3000);
      }
    )
  }
  else{
    alert('Invalid Form')
  }
}
//clear fund form
clearFundForm(){
  this.fundTransferErrorMsg=""
  this.fundTransferSuccessMsg=""
  this.fundForm.reset()
}
//logout
logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentAcno")
  this.logoutDiv=true
//navigate to url
  setTimeout(() => {
    this.router.navigateByUrl('')
    this.logoutDiv=false

  }, 4000);

}

//delete account from navbar
deleteAccountFromNavBar(){
  this.acno = localStorage.getItem("currentAcno")
  this.deleteConfirm=true
}
onCancel(){
  this.acno=""
  this.deleteConfirm=false
}

onDelete(event:any){
  let deleteAcno = JSON.parse(event)
  // alert(deleteAcno)
  this.api.deleteAccount(deleteAcno).subscribe((result:any)=>{
    this.acno=""

    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.deleteSpinnerDiv=true
    setTimeout(() => {
      //navigate to login
      this.router.navigateByUrl('')
      this.deleteSpinnerDiv=false
  
    }, 4000);

  },
  (result:any)=>{
    alert(result.error.message)
  }
  )
}
}
