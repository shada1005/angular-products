import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { Product } from '../../models/product.class';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listofproducts: Product[] = [];// array that contains all the products 

/**
 * 
 * @param productService - call service object to run delete method
 * @param rout - this object will be used to build url and nivigate page to another when we press "view" button
 */
  constructor(private productService: ProductService, private rout: Router) { }

 /**
  * display products list
  * using service obj. that retrive from the server side the recent list
  */ 
  ngOnInit(): void {
    this.productService
      .getProudct()
      .subscribe((result: Product[]) => (this.listofproducts = result));


  }
  ngAfterContentInit(): void{
    this.productService
    .getProudct()
    .subscribe((result: Product[]) => (this.listofproducts = result));

  }


  /**
   * 
   * @param id 
   * user hit VIEW button on specific row that represnt a product 
   * we will get from product fields the id value
   * using rout obj. we will navigate to another page that called "product" also we will send id value to other uses in that page
   */
  enter(id: number) {
    // rout madify the url to contains fields like id 
    this.rout.navigate(['/product', id.toString()]);
  }


  /**
   * 
   * @param id 
   * this method will be called when the user hit the "DELETE" button 
   * it will delete this product from server side useing service obj.
   * after deleting we will filter the list in the UI 
   */
  delete(id: number) {
    this.productService.delete(id).subscribe(
      data => {
        if (data) {
          this.listofproducts = this.listofproducts.filter(l => l.id !== id);
        }
      }
    );
  }

}
