import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { User } from 'src/app/models/user';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-user',
  templateUrl: '../register/register.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService, CityService]
})
export class EditUserComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public cities: City[] = [];
  public identity: any;
  constructor(private _userService: UserService, private _cityService: CityService, private _route: ActivatedRoute, private _router: Router) {
    this.page_title = 'Guardar';
    this.user = new User('', '', '', '', '', '', '', '', '');
    this.status = '';
    this.identity= this._userService.getIdentity();
  }
  ngOnInit(): void {
    this.getCities();
    this.getUser();
  }

  getCities() {

    this._cityService.getCities().subscribe(response => {


      this.cities = response.cities;
      console.log(this.cities);
    },
      error => {

      });



  }
  getUser(){
    
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._userService.getUser(id).subscribe(
        response => {
          if (response.user) {
            
           this.user= response.user;
          } 
          let formattedDate = (moment(response.user.birthday)).format('YYYY-MM-DD');
          this.user.birthday=formattedDate;
          console.log(this.user);
          this.user.typedocument=response.user.typedocument;
        
        },
        error => {
          this.status = 'error';

        }
      );
    });
  }
  onSubmit(form: any) {
    //console.log(form)

    this._route.params.subscribe((params) => {
      let id = params['id'];


      console.log('id'+id)
      this._userService.update(this.user,id).subscribe(
        response => {
          if (response.user) {
            this.status = 'success';
            
          } else {
            this.status = 'error';
          }

          console.log(response);
        },
        error => {
          this.status = 'error';

        }
      );
    });



  }
}
