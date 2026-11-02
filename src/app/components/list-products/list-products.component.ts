import { Component, inject, OnInit } from '@angular/core';

import { 
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone'
import { TranslatePipe } from '@ngx-translate/core';
import { UserOrderService } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    TranslatePipe,
    IonList
  ]
})
export class ListProductsComponent {

  private userOrderService: UserOrderService = inject(UserOrderService);

  public totalOrderSignal = this.userOrderService.totalOrderSignal;
  public productsSignal = this.userOrderService.productsSignal;

}
