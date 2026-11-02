import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonMenu,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonButton
} from '@ionic/angular/standalone'
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cartOutline, peopleOutline } from 'ionicons/icons';
import { UserOrderService } from 'src/app/services/user-order.service';
import { ListProductsComponent } from '../list-products/list-products.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonImg,
    RouterLink,
    IonMenu,
    IonContent,
    TranslatePipe,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonBadge,
    ListProductsComponent,
    IonButton
  ]
})
export class ToolbarComponent {

  private userOrderService: UserOrderService = inject(UserOrderService);

  public numProductsSignal = this.userOrderService.numProductsSignal;

  public showOrder: boolean = false;

  constructor() {
    addIcons({
      peopleOutline,
      cartOutline,
      arrowBackOutline
    })
  }

  seeOrder(){
    this.showOrder = true;
  }

  back(){
    this.showOrder = false;
  }

}
