import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user";
import {Product} from "../product";
import {GenericService} from "../generic.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() user: string;
  @Input() password: string;
  @Input() user_id: number;
  products: Product[] = [];
  products_to_display: Product[] = [];
  add_enabled: boolean = false;
  page: number = 0;
  nrItemsOnPage: number = 4;
  prod_id: number;

  constructor(private genericService: GenericService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.add_enabled = false;
    console.log("ngOnInit called for ProductComponent");
    this.getProducts();
    console.log(this.products_to_display);
  }

  onNext(): void {
    if (this.page < 2) {
      this.page++;
      this.getProductsToDisplay();

    }
  }

  onPrevious(): void {
    if (this.page > 0) {
      this.page--;
      this.getProductsToDisplay();
    }
  }

  getProductsToDisplay(): void {
    // use this for pagination
    this.products_to_display = [];
    if (this.products.length < 5) {
      this.products_to_display = this.products;
    } else {
      if (this.page == 0 && this.products.length > this.nrItemsOnPage) {
        for (let i = 0; i < this.nrItemsOnPage; i++) {
          this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + i]);
        }
      } else if (this.products.length > this.page * this.nrItemsOnPage) {
        for (let i = 0; i < this.nrItemsOnPage; i++) {
          this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + i]);
        }
      } else if (this.products.length > this.page * this.nrItemsOnPage) {
        for (let i = 0; i < this.products.length - (this.page + 1) * this.nrItemsOnPage; i++) {
          this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + this.nrItemsOnPage + i]);
        }
      }
    }
  }


  getProducts(): void {
    // take from service the request and initialize the products list
    this.genericService.fetchProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
      this.products_to_display = [];
      if (this.products.length < 5) {
        this.products_to_display = this.products;
      } else {
        if (this.page == 0 && this.products.length > this.nrItemsOnPage) {
          for (let i = 0; i < this.nrItemsOnPage; i++) {
            this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + i]);
          }
        } else if (this.products.length > this.page * this.nrItemsOnPage) {
          for (let i = 0; i < this.nrItemsOnPage; i++) {
            this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + i]);
          }
        } else if (this.products.length > this.page * this.nrItemsOnPage) {
          for (let i = 0; i < this.products.length - (this.page + 1) * this.nrItemsOnPage; i++) {
            this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + this.nrItemsOnPage + i]);
          }
        }
      }


    });

  }

  filter(c: string, p: string) {
    let newproducts;
    if (c != "") {
      newproducts = this.products.filter((x) => x.Category === c);
      this.products = newproducts;
    }

    if (p != "") {
      newproducts = this.products.filter((x) => String(x.Price) <= p);
      this.products = newproducts;
    }

    this.products_to_display = [];
    if (this.products.length < 5) {
      this.products_to_display = this.products;
    } else {
      if (this.page == 0 && this.products.length > this.nrItemsOnPage) {
        for (let i = 0; i < this.nrItemsOnPage; i++) {
          this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + i]);
        }
      } else if (this.products.length > this.page * this.nrItemsOnPage) {
        for (let i = 0; i < this.nrItemsOnPage; i++) {
          this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + i]);
        }
      } else if (this.products.length > this.page * this.nrItemsOnPage) {
        for (let i = 0; i < this.products.length - (this.page + 1) * this.nrItemsOnPage; i++) {
          this.products_to_display.push(this.products[this.page * this.nrItemsOnPage + this.nrItemsOnPage + i]);
        }
      }
    }

  }

  filterByCategory(category: string): void {
    this.genericService.fetchProductsByCategory(category).subscribe(products => this.products = products);
  }

  onSelect(r: Product): void {
    this.add_enabled = true;
    this.prod_id = r.Id;
    console.log("Product with id " + r.Id + " is selected.");
  }

  add(d: string): void {
    this.genericService.add(this.prod_id, this.user_id, d);
    this.add_enabled = false;
  }

}
