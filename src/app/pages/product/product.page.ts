import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { 
  IonContent, 
  LoadingController,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonText,
  IonCardContent
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/models/product.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ImageUrlPipe } from 'src/app/pipes/image-url.pipe';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline } from 'ionicons/icons';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    TranslatePipe,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    ImageUrlPipe,
    IonCardSubtitle,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonText,
    IonCardContent
  ]
})
export class ProductPage {

  private router: Router = inject(Router);
  private productsService: ProductsService = inject(ProductsService);
  private loadingCtrl: LoadingController = inject(LoadingController);
  private translateService: TranslateService = inject(TranslateService);

  @Input() idProduct!: string;

  public productSignal: WritableSignal<IProduct | null> = signal(null);

  public quantitySignal: WritableSignal<number> = signal(1);

  constructor(){
    addIcons({
      addOutline,
      removeOutline
    })
  }

  ionViewWillEnter() {

    console.log(this.idProduct);

    if (this.idProduct) {
      this.loadProduct();
    } else {
      this.router.navigateByUrl('categories');
    }

  }

  async loadProduct() {

    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading')
    });

    loading.present();

    this.productsService.getProduct(this.idProduct).then((product: IProduct) => {
      this.productSignal.set(product);
      console.log(this.productSignal());
    }).finally(() => {
      loading.dismiss();
    })

  }

  minusQuantity(){
    this.quantitySignal.update( value => value - 1);
  }

  addQuantity(){
    this.quantitySignal.update( value => value + 1);
  }


}
