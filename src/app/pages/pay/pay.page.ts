import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonInput
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { CreateAccountComponent } from 'src/app/components/create-account/create-account.component';
import { ListProductsComponent } from 'src/app/components/list-products/list-products.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UserOrderService } from 'src/app/services/user-order.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    LoginComponent,
    CreateAccountComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    TranslatePipe,
    IonCardContent,
    IonButton,
    IonItem,
    ListProductsComponent,
    IonRadioGroup,
    IonRadio,
    FormsModule,
    IonInput
  ]
})
export class PayPage {

  private userOrderService: UserOrderService = inject(UserOrderService);
  private router: Router = inject(Router);

  public userSignal = this.userOrderService.userSignal;
  public numProductsSignal = this.userOrderService.numProductsSignal;

  public showCreateAccount: boolean = false;
  public step: number = 1;
  public address: string = this.userSignal()!.address!;
  public showNewAddress: boolean = false;


  backHome() {
    this.router.navigateByUrl('categories')
  }

  newAccount() {
    this.showCreateAccount = true;
  }

  seeLogin() {
    this.showCreateAccount = false;
  }

  nextStep() {
    this.step += 1;
  }

  previousStep() {
    this.step -= 1;
  }

  changeOptionAddress(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    switch (target.value) {
      case 'address-default':
        this.address = this.userSignal()!.address!;
        this.showNewAddress = false;
        break;
      case 'choose-address':
        this.address = '';
        this.showNewAddress = true;
        break;
    }
  }

}
