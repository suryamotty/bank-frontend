import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   //login group
   registerForm=this.fb.group({
    //array
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
   
  })
constructor(private fb: FormBuilder,private api:ApiService,private router:Router){

  
}
register(){
  if(this.registerForm.valid){
    // alert('register clicked')
    // console.log(this.loginForm)
    let acno = this.registerForm.value.acno
    console.log(acno);
    
    let pswd = this.registerForm.value.pswd
    console.log(pswd);
    let uname= this.registerForm.value.uname
    this.api.register(uname,acno,pswd)
    .subscribe(
      
      (result:any)=>{
      // console.log(result);
      alert(result.message)
   
      //navigation login
      this.router.navigateByUrl('')

    },
    //client error
    (result:any)=>{
      alert(result.error.message)
    }
    
    )
  }
  else{
    alert('Invalid form')
  }
}

}
