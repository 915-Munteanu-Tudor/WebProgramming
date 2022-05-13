import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from './user';
import {Purchase} from './purchase';
import {Product} from './product';
import {ProductModel} from "./productModel";

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private backendUrl = 'http://localhost/back-end/controller.php';
  private result = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }
  fetchUsers() : Observable<User[]> {

    return this.http.get<User[]>(this.backendUrl+'?action=getAllUsers').pipe(catchError(this.handleError<User[]>('fetchUsers', [])));
  }

  getUserPassword(usr: string, pass: string): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl+'?action=getUserPassword'+'&user='+usr+'&password='+pass).pipe(catchError(this.handleError<User[]>('fetchUsers', [])));
  }

  fetchProducts() : Observable<Product[]> {

    return this.http.get<Product[]>(this.backendUrl+'?action=getAllProducts').pipe(catchError(this.handleError<Product[]>('fetchProducts', [])));
  }

  update(d:number, uid:number, pid:number) {
    return this.http.get<string>(this.backendUrl+'?action=update'+'&d=' +String(d)+"&uid="+String(uid) + "&pid="+String(pid)).subscribe(() => console.log("user updated"));

  }

  fetchProductsByCategory(category: string) : Observable<Product[]> {

    return this.http.get<Product[]>(this.backendUrl+'?action=getAllProductsByCategory'+'&category='+category).pipe(catchError(this.handleError<Product[]>('fetchProductsByCategory', [])));
  }

  delete(prod_id:number, user_id:number) {
    console.log("prod_id: " + String(prod_id));
    console.log("user_id: " + String(user_id));
    console.log("service delete");
    console.log(this.backendUrl+'?action=deletePurchase'+'&pid='+String(prod_id)+"&uid="+String(user_id));
    return this.http.get<string>(this.backendUrl+'?action=deletePurchase'+'&prid='+String(prod_id)+"&uid="+String(user_id)).subscribe(() => console.log("user deleted"));
  }

  add(prod_id: number, user_id:number, d:string) {
    return this.http.get<string>(this.backendUrl+'?action=addPurchase'+'&user='+String(user_id)+'&prod='+String(prod_id)+'&quantity='+String(d)).subscribe(() => console.log("purchase added!"));
  }

  fetchUserWithProducts() : Observable<User[]> {

    return this.http.get<User[]>(this.backendUrl+'?action=getAllProducts').pipe(catchError(this.handleError<User[]>('fetchProducts', [])));
  }

  fetchProductsForUser(usr: string, pass:string) : Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.backendUrl+'?action=getProductsForUserPassword'+'&user='+usr + '&password='+pass).pipe(catchError(this.handleError<ProductModel[]>('fetchPurchases', [])));
  }

  validateUser(usr: string, pass:string) : string {
    let $res = this.http.get<string>(this.backendUrl+'?action=validateUser'+'&user='+usr + '&password='+pass).subscribe(data => {this.result = data});
    console.log(this.result);
    return this.result;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
