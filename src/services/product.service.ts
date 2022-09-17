import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url="Product";

  /**
   * 
   * @param http - this obj will make http requests to the server side
   */
  constructor(private http: HttpClient) { }


  /**
   * This method will send GET Http req.
   * @returns list of products from the server side
   */
  public getProudct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}${this.url}`);
  }
  /**
   * This method will send DELETE Http req.
   * @param id - getting from products component 
   * @returns 
   */
  public delete(id:number): Observable<number> {
    return this.http.delete<number>(`${environment.apiUrl}${this.url}`+'/'+id);
  }

  /**
   * This method will send POST Http req.
   * @param product - getting from product component 
   * @returns 
   */
  public update(product:Product): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}${this.url}`,product);
  }

}
