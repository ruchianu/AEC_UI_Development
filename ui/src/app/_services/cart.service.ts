import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable()

export class CartService {
  public allItems: any  = {};  
  public cartData: any  = [];  
  public cartItemsList: any  = {};  
  public cartTotal: any  = 0;  
  public cartItemsStorageName = 'mycart';

  constructor(
    public storage: StorageService
  ){
    this.loadCart();
  }

  loadCart(){
    let temp = this.storage.get('mycart'); 
    if(temp === undefined || temp ==='' || temp === null){
      this.cartData = {}; 
    }else{
      this.cartData = temp; 
    }
  }

  addToCart(pid:any,qty:any,replace:any){
   
    if(this.cartData[pid] == undefined){
      this.cartData[pid] = 0;
    }
    if(replace===''){
      this.cartData[pid] =  this.cartData[pid] + qty;
    }else{
      this.cartData[pid] =  parseInt(qty);
    }
    
    if(this.cartData[pid]==0){
      delete this.cartData[pid];
    }
    this.storeItems();
  }

  storeItems(){
    this.storage.set({
      'mycart' : this.cartData
    });
    this.listCartItems();
  }

  listCartItems(){
    let tempCart:any = [];
    let getActualItems = Object.keys(this.cartData);
    let cartDataItems = this.cartData;
    let tempTotal = 0;
  
    this.allItems.filter(function(item:any) {

    if(getActualItems.indexOf(item.pid.toString()) !== -1 ){
      tempCart.push({
          pid:  item.pid,
          name:  item.name,
          qty:  cartDataItems[item.pid],
          price:  item.price*cartDataItems[item.pid],
        });  
        tempTotal += item.price*cartDataItems[item.pid];
      }
    });

  
    this.cartItemsList = tempCart;
    this.cartTotal = tempTotal;

    this.storage.set({
      'cartItemsList' : this.cartItemsList 
    });

    this.storage.set({
      'cartTotal' : this.cartTotal
    });
    
    
  }

  loadCheckoutInfo(storageKey: string){
    return this.storage.get(storageKey)
  }

   emptyCart(){   
    this.cartData = [];  
    this.listCartItems(); 
  }
  
  
}