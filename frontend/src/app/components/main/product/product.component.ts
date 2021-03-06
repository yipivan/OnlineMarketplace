import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { getParseErrors } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayproducts: string[];
  products: any[];
  counter: number;
  increment: number = 10;
  noResult: boolean = false;
  loadMore: boolean = false;

  @Input() searchKey: string;
  @Input() searchedProducts: any;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.init();
    this.productService.searchEvent$.subscribe(products => {
      console.log(products);
      this.products = this.sortByTags(products);
      this.InitDisplay();
    })
  }

  init() {
    this.counter = 0;
    if (!this.searchKey) {
      this.getAll();
    } else {
      this.getSearched();
      console.log('Using the searchkey to get products');
    }
    this.productService.onSort$.subscribe(attr => {
      if (attr == "new") {
        this.products = this.products.sort((a, b) => {
          if (a.condition == attr && b.condition != attr) {
            return -1;
          } else if (a.condition == attr && b.condition == attr) {
            return 0;
          } else if (a.condition != attr && b.condition != attr) {
            return 0;
          } else {
            return 1;
          }
        })
      } else if (attr == "used") {
        this.products = this.products.sort((a, b) => {
          if (a.condition == attr && b.condition != attr) {
            return -1;
          } else if (a.condition == attr && b.condition == attr) {
            return 0;
          } else if (a.condition != attr && b.condition != attr) {
            return 0;
          } else {
            return 1;
          }
        })
      } else if (attr == "high") {
        this.products = this.products.sort((a, b) => {
          return a.curentBidPrice - b.curentBidPrice;
        })
      } else if (attr == "low") {
        this.products = this.products.sort((a, b) => {
          return b.curentBidPrice - a.curentBidPrice;
        })
      }
      this.InitDisplay();
    })
  }

  getAll() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.InitDisplay();
    })
  }

  private sortByTags(products): any {
    return products.sort((a, b) => {
      return b.Tags.length - a.Tags.length;
    })
  }

  getSearched() {
    this.products = this.sortByTags(this.searchedProducts);
    this.InitDisplay();
  }


  InitDisplay() {
    if (this.products.length > this.increment) {
      this.loadMore = true;
      this.displayproducts = this.products.slice(0, this.increment);
      this.counter += this.increment;
    } else {
      this.displayproducts = this.products.slice(0, this.products.length);
    }
    // }
  }

  loadNext() {
    if (this.products.length > (this.counter + this.increment)) {
      this.loadMore = true;
      this.displayproducts = this.products.slice(0, this.increment + this.counter);
      this.counter += this.increment;
    } else {
      this.displayproducts = this.products.slice(0, this.products.length);
      this.loadMore = false;
    }
  }
}
