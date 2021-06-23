import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { User } from 'src/app/models/user';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, CityService]
})
export class RegisterComponent implements OnInit {
  public page_title:string;
  public user: User;
  public status: string;
  public cities: City[] = [];
  public identity:any;
  constructor(private _userService: UserService, private _cityService:CityService) {
    this.page_title='Registrate';
    this.user = new User('', '', '', '', '', '', '','','');
    this.status='';
  }
  ngOnInit(): void {
    this.getCities();
    this.identity = this._userService.getIdentity();
  }


  getCities(){
      
    this._cityService.getCities().subscribe(response=>{
     

      this.cities=response.cities;
      console.log(this.cities);
    },
      error=>{

      });



  }

  onSubmit(form:any){
//console.log(form)
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.user){
          this.status= 'success';
          form.reset();
        }else{
          this.status='error';
        }
      },
      error=>{
        this.status='error';

      }
    ); 
  }
}
