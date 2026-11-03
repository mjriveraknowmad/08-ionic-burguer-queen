import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone'
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { KEY_TOKEN } from 'src/app/constants';
import { ITokenUser } from 'src/app/models/token-user.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserOrderService } from 'src/app/services/user-order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    TranslatePipe,
    IonButton
  ]
})
export class CreateAccountComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private usersService: UsersService = inject(UsersService);
  private toastService: ToastService = inject(ToastService);
  private translateService: TranslateService = inject(TranslateService);
  private userOrderService: UserOrderService = inject(UserOrderService);
  private authService: AuthService = inject(AuthService);

  @Input() showButtonBack: boolean = false;

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() doCreateAccount: EventEmitter<void> = new EventEmitter<void>();

  public formNewAccount: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    address: ['', Validators.required],
  })

  createAccount() {

    const user: IUser = this.formNewAccount.value;

    this.usersService.createUser(user).then( async (userDB: IUser) => {
      if(userDB){

        this.toastService.showToast(this.translateService.instant('label.create.account.success'))

        const token: ITokenUser = await this.authService.login(user.email, user.password);

        await Preferences.set({
          key: KEY_TOKEN,
          value: token.accessToken
        })

        this.userOrderService.setUser(userDB);
        this.doCreateAccount.emit();

      }else{
        this.toastService.showToast(this.translateService.instant('label.create.account.error'))
      }
    }).catch(err => {
      this.toastService.showToast(this.translateService.instant('label.create.account.error'))
    })

  }

  exit(){
    this.back.emit();
  }


}
