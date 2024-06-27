import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  constructor (private httpclient:HttpClient){
  }


  btnname="login"
  pagecondt=false;

  onclkchangpage(status:boolean){
    this.pagecondt=status;
  }
  
  onclickbtn(){
    this.pagecondt=true
  }

    
  cancelbtn(){
    this.pagecondt=false
  }
  OnSubmit(Singup){
    if(this.btnname==="submit"){
      this.httpclient.post('http://localhost:2000/api/v1/userin'+this.storeId,Singup.value).subscribe(res=>{
        console.log(Singup.value);
        this.pagecondt=false;
        this.Ongetdata();
        this.username="";
    this.userph="";
    this.useradress="";
    this.userpassword="";
    this.btnname = "login";
      }
    )}
      else{
        this.httpclient.post('http://localhost:2000/api/v1/userin',Singup.value).subscribe(res=>{
          console.log(Singup.value);
          this.pagecondt=false;
          this.Ongetdata();
        })
      }
  }


 Getdata:any;

Ongetdata(){
  this.httpclient.get('http://localhost:2000/api/v1/user').subscribe(res=>{
    this.Getdata=res
  })
}

  ngOnInit(){
    this.Ongetdata()
  }

DeleteItem(id){
  this.httpclient.delete('http://localhost:2000/api/v1/deletedat/'+id).subscribe(res=>{
console.log('deleted successfully');
// this.pagecondt=false
this.Ongetdata();
  })
}


username="";
userph="";
useradress="";
userpassword="";

storeId=""

editItem(id){
  this.httpclient.get("http://localhost:2000/api/v1/findbyid/"+id).subscribe(res=>{
    console.log(res);
    this.pagecondt=true;
    this.Ongetdata();
    this.username=res[0].name;
    this.userph=res[0].adress;
    this.useradress=res[0].adress;
    this.userpassword=res[0].password;
    this.btnname = "Submit";
    this.storeId = id;
  })
}


}
