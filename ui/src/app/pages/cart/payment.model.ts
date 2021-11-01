export class PaymentModel {
    firstname: any;
    lastname: any;
    email: any;
    phone: any;
    amount: any;
    productinfo: any;
    txnid: number;
    surl: string;
    furl: string;
  
    constructor() {
      this.furl = 'http://15.206.174.177/user/failure';
      this.surl = 'http://15.206.174.177/user/success';
      this.txnid = this.getRandomInt();
    }
  
    getRandomInt() {
      return Math.floor(100000 + Math.random() * 900000);
    }
  }