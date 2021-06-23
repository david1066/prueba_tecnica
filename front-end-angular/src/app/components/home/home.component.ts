import { Component, OnInit ,DoCheck} from '@angular/core';
import { City } from 'src/app/models/city';
import { User } from 'src/app/models/user';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService,CityService]
})
export class HomeComponent implements OnInit {

  public users: Array<User> = [];
  public user: User;
  public identity: any ;
  public cities: City[] = [];

  constructor(private _userService:UserService, private _cityService: CityService) { 
    this.identity = this._userService.getIdentity();
  
    this.user = new User('', '', '', '', '', '', '','','');
  }

  ngOnInit(): void {
   this.getUsers();
   this.getCities();
  }

  ngDoCheck() {
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

  filterCitiesOfType(city:any){
    return this.cities.filter(x => x.id == city);
}
  getUsers(){
    
    this._userService.getUsers(this.user).subscribe(response=>{
      if(response.users){
        console.log(response.users);

        this.users=response.users;
      }

  },error=>{

  });
  }

  deleteUser(id:string){
    this._userService.delete(id).subscribe(response=>{
      this.getUsers()
  },error=>{

  });
  }

  onSubmit(form:any){
   console.log(this.user);
    this.getUsers();
  }
  
}
