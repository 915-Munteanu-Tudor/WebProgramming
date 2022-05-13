import { Component } from '@angular/core';
import {GenericService} from "./generic.service";
import {User} from "./user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tema-angular';
  user = '';
  password = '';
  showInfo = false;
  user_id: number = -1;
  users: User[] = [];

  constructor(private genericService: GenericService) {

  }

  getUsers(): void {
    this.genericService.fetchUsers().subscribe(users=>{
      this.users = users;
      var i;
      console.log(this.users);
      console.log(this.user);
      console.log(this.password);
      for (i = 0; i < users.length; i++) {
        if (users[i].Name === this.user && users[i].Password === this.password) {
          this.showInfo = true;
          this.user_id = users[i].Id;
        }
      }
      if(this.showInfo){
        alert('Successfully logged in!');
        this.showInfo = true;
      }
      else {
        alert('Try again!');
      }
    });
  }

  onClickShowContent(name:string, password:string) : void {
    this.user = name;
    this.password = password;
    this.getUsers();
  }

}
