import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user";
import {GenericService} from "../generic.service";
import {ProductModel} from "../productModel";

@Component({
  selector: 'app-users-purchases',
  templateUrl: './users-purchases.component.html',
  styleUrls: ['./users-purchases.component.scss']
})
export class UsersPurchasesComponent implements OnInit {

  @Input() user: string;
  @Input() password: string;
  @Input() user_id: number;
  purchases: ProductModel[] = [];
  showInfo: boolean = false;
  prodId: number;
  userId: number;
  users: User[] = [];
  user_generic: User[] = [];
  delete_enabled: boolean;
  update_enabled: boolean;
  constructor(private genericService: GenericService) {
    this.delete_enabled = false;
    this.update_enabled = false;
    console.log("ngOnInit called for UserReservationsComponent");
  }

  getProducts(): void {
    this.genericService.fetchProductsForUser(this.user, this.password).subscribe(products => this.purchases = products);
  }

  // getUsers(): void {
  //   this.genericService.fetchUsers().subscribe(users=>{
  //     this.users = users;
  //     var i;
  //     for (i = 0; i < users.length; i++) {
  //       if (users[i].name === this.user && users[i].password === this.password) {
  //         this.showInfo = true;
  //       }
  //     }
  //     if(this.showInfo){
  //       alert('Successfully logged in!');
  //       this.getRooms();
  //     }
  //     else {
  //       alert('Try again!');
  //     }
  //   });
  // }

  onSelect(r: ProductModel): void {
    this.delete_enabled = true;
    this.update_enabled = true;
    console.log("Purchase " + r.product_id + " was selected.");
    this.prodId = r.product_id;
    this.userId = r.user_id;
  }


  // delete(): void {
  //   console.log("room id: " + this.roomId);
  //   console.log("user id " + this.userId);
  //   this.genericService.delete(this.roomId, this.userId);
  //   this.delete_enabled = false;
  // }

  delete(): void{
    if (confirm('Are you sure you want to delete this purchase?')) {
      this.genericService.delete(this.prodId, this.userId);
      this.delete_enabled = false;
      this.getProducts();
      alert("The purchase was deleted!")
    } else {
      this.getProducts();
    }
  }

  update(d:string): void {
    this.genericService.update(Number(d), this.userId, this.prodId);
    this.update_enabled = false;
    this.getProducts();
  }

  ngOnInit(): void {
    console.log("user in user-purchases-component is " + this.user);
    console.log("password in user-purchases-component is " + this.password);
    //this.getUsers();
    this.getProducts();
    this.delete_enabled = false;
    this.update_enabled = false;

  }

}
