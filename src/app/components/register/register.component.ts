import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModelDTO } from '../../models/registerModelDTO';


interface RegisterResponse {
  accessToken: string;
}
@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registerModel:RegisterModelDTO= new RegisterModelDTO();

constructor(private http:HttpClient, private router:Router){}


setImage(event:any){
  console.log(event)
  this.registerModel.file=event.target.files[0];
}





// register(){

//   const formdata=new FormData();
//   formdata.append("name",this.registerModel.name);
//   formdata.append("name",this.registerModel.file, this.registerModel.file.name)
//   this.http.post("https://localhost:7144/api/Auth/Register",formdata).subscribe(resp=>{
//     localStorage.setItem("accessToken",JSON.stringify(resp))
//     this.router.navigateByUrl("/login")
//   })
// }

register() {
  const formData = new FormData();
  formData.append("name", this.registerModel.name);
  if (this.registerModel.file) {
    formData.append("file", this.registerModel.file);
  }

  this.http.post<RegisterResponse>("https://localhost:7144/api/Auth/Register", formData).subscribe({
    next: (resp) => {
      localStorage.setItem("accessToken", resp.accessToken);
      this.router.navigateByUrl("/login");
    },
    error: (err) => {
      console.error("Register error:", err);
      console.log("Error details:", err.error);
      alert("Registration failed: " + (err.error?.message || "Please check your inputs."));
    }
  });
}

}
