import { async } from '@angular/core/testing';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    //Use await to call an asynchronous methods that returns a promise just like you would call a synchronous method. Apply the async decorator to the method name as well.
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    
    item$.snapshotChanges().pipe(take(1)).subscribe(item => { //take allows to get n values from an observable and then it will automatically unsubscribe/complete.
      item$.update({ product: product, quantity: (item.payload.child("/quantity").val() || 0) + change });
    }); 
  }
}
