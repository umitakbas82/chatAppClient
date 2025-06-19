import { Component } from '@angular/core';
import { UserModelDTO } from '../../models/userModelDTO';
import { chatModelDTO } from '../../models/chatModelDTO';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

user=new UserModelDTO();

constructor(private http:HttpClient){
  this.user=JSON.parse(localStorage.getItem("accessToken")??"")
}
  
logout(){
  localStorage.clear();
  document.location.reload()
}

getUsers(){
  this.http.get<UserModelDTO[]>('https://localhost:7144/api/Chats/GetUsers').subscribe(resp=>{
    this.users=resp.filter(p=>p.id!=this.user.id)
  })
}



changeUser(user:UserModelDTO){
  this.selectedUserID=user.id;
  this.selectedUser=user;

  this.http.get(`https://localhost:7144/api/Chats/GetChats?userId=${this.user.id}&toUserId=${this.selectedUserID}`).subscribe((res:any)=>{
    this.chats = res;
  });
}


}



