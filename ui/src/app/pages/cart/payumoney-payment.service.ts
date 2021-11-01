import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { AuthService } from "../../auth.service"
import {PaymentModel} from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PayumoneyPaymentService {

  constructor(private httpService: AuthService) {
  }

  createPayment(paymentRequest: PaymentModel) {


    const PAYMENT_URL = '/user/pay';
    return this.httpService.postpayu(PAYMENT_URL, paymentRequest);
  }

}
