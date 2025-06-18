import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModelDTO } from '../../models/registerModelDTO';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registerModel:RegisterModelDTO= new RegisterModelDTO

constructor(private http:HttpClient, private router:Router){}

register(){

  const formdata=new FormData();
  formdata.append("name",this.registerModel.name);
  formdata.append("name",this.registerModel.file, this.registerModel.file.name)
  this.http.post("https://localhost:7144/api/Auth/Register",formdata).subscribe(resp=>{
    
    this.router.navigateByUrl("/login")
  })
}

setImage(event:any){
  console.log(event)
  this.registerModel.file=event.target.files[0];
}


}
