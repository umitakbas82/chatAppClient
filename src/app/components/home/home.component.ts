import { Component } from '@angular/core';
import { UserModelDTO } from '../../models/userModelDTO';
import { chatModelDTO } from '../../models/chatModelDTO';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
users:UserModelDTO[]=[];
chats:chatModelDTO[]=[];
selectedUserID:string="";
selectedUser:UserModelDTO= new UserModelDTO();
message: string = "";  
user=new UserModelDTO();

constructor(private http:HttpClient, private router:Router){
  // this.user = JSON.parse(localStorage.getItem("accessToken") ?? "");
    this.getUsers();
}
  
logout(){
  localStorage.clear();
  //document.location.reload()
  this.router.navigateByUrl("/login")
}

getUsers(){
  this.http.get<UserModelDTO[]>('https://localhost:7144/api/Chats/GetUsers').subscribe(resp=>{
    this.users=resp.filter(p=>p.id!=this.user.id)
   
  })

  console.log(this.users)
}



changeUser(user:UserModelDTO){
  this.selectedUserID=user.id;
  this.selectedUser=user;

  this.http.get(`https://localhost:7144/api/Chats/GetChats?userId=${this.user.id}&toUserId=${this.selectedUserID}`).subscribe((res:any)=>{
    this.chats = res;
  });
}

sendMessage(){
  const data ={
    "userId": this.user.id,
    "toUserId": this.selectedUserID,
    "message": this.message
  }
  this.http.post<chatModelDTO>("https://localhost:7123/api/Chats/SendMessage",data).subscribe(
    (res)=> {
      this.chats.push(res);
      this.message = "";
  });
}



}



