import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { Product } from '../../models/product.class';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;//Contains the original product 
  id:number;// containg id product
  @ViewChild('proName') nameChanged:ElementRef;// point to field at HTML page
  @ViewChild('quantity') quantChanged:ElementRef;// point to field at HTML page

  /**
   * 
   * @param productService - call service object to run update method
   * @param activatedRoute - using this object we extract any param that other component sent.
   */
  constructor(private productService: ProductService,private activatedRoute : ActivatedRoute,private rout: Router){}


/**
 * This method will be called create/reload Product page
 * used activatedRoute to get the id for the product we want to display. the "id" field was sent by main page "products" 
 * used productService to make connection with the server side to retrive specific product that has the same "id"
 */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.id=Number(data['id']);
      this.productService
      .getProudct()
      .subscribe((result: Product[] ) => (this.product= result.find(l=>l.id===this.id)));
    });

  }

/**
 * Method update will be called only if the user hit the "update" button
 * this method will update the original products fields in the server side
 * first step getting the values that user modified {nameChanged & quantChanged are input fields in HTML product page}
 * second step calling update method from service object to change it at the server side
 */
  update(){
    // getting values from input fields in HTML page
    const valueInput = this.nameChanged.nativeElement.value
    const quaInput = this.quantChanged.nativeElement.value

    // checking that both are not enpty
    if(valueInput && quaInput){

    this.product.name=valueInput;
    this.product.inventory=quaInput;
    this.productService.update(this.product).subscribe();
    this.rout.navigate(['..']);
  }
// in case that at least one of the fields are empty we display product original values before the user change it
// we wont update the oiginal product at the server side
    else{
      this.nameChanged.nativeElement.value=this.product.name;
      this.quantChanged.nativeElement.value=this.product.inventory;
    }
  }

}
