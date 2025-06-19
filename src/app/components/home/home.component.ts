import { Component } from '@angular/core';
import { UserModelDTO } from '../../models/userModelDTO';
import { chatModelDTO } from '../../models/chatModelDTO';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
users:UserModelDTO[]=[];
chats:chatModelDTO[]=[];
selectedUserID:string="";
selectedUser:UserModelDTO= new UserModelDTO();

user=new UserModelDTO();

constructor(private http:HttpClient){}
  
logout(){
  localStorage.clear();
  document.location.reload()
}

getUsers(){}



changeUser(user:UserModelDTO){
  this.selectedUserID=user.id;
  this.selectedUser=user;

  this.http.get(`https://localhost:7144/api/Chats/GetChats?userId=${this.user.id}&toUserId=${this.selectedUserID}`).subscribe((res:any)=>{
    this.chats = res;
  });
}


}



