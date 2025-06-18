import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

register:RegisterModelDTO= new RegisterModelDTo

constructor(private http:HttpClient, private router:Router){}

login(){
  this.http.get("https://localhost:7144/api/Auth/Login?name="+this.name).subscribe(resp=>{
    localStorage.setItem("accesstoken",JSON.stringify(resp));
    this.router.navigateByUrl("/")
  })
}


}
