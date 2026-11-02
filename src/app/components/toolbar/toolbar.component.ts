import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  IonButton,
  MenuController
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
  private menuController: MenuController = inject(MenuController);
  private router: Router = inject(Router);


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

  goToPay(){
    this.back();
    this.menuController.close('content'); // cierra el ion-menu que tiene menuId="content" (ahora mismo es el único ion-menu)
    this.router.navigateByUrl('/pay')
  }

}
