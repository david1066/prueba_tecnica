import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'front-end-angular';
  public identity:any;

  constructor(private _userService: UserService, private _router: Router){
    this.identity =_userService.getIdentity();
  }

  ngDoCheck() {
    this.loadUser();
  }
  loadUser(){

    this.identity = this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/inicio']);
  }
}
