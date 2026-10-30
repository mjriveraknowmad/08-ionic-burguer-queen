import { Component, inject, Input } from '@angular/core';
import { 
  IonContent,
  LoadingController,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/models/product.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ImageUrlPipe } from 'src/app/pipes/image-url.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonRefresher,
    IonRefresherContent,
    TranslatePipe,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    ImageUrlPipe
  ]
})
export class ProductsPage {

  private router: Router = inject(Router);
  private productsService: ProductsService = inject(ProductsService);
  private loadingCtrl: LoadingController = inject(LoadingController);
  private translateService: TranslateService = inject(TranslateService);

  @Input() idCategory!: string;

  public products: IProduct[] = [];

  async ionViewWillEnter() {

    console.log(this.idCategory);

    if (this.idCategory) {

      this.loadData();

    } else {
      this.router.navigateByUrl('categories')
    }


  }

  async loadData() {

    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading')
    });

    loading.present();

    this.productsService.getProductsByCategory(this.idCategory).then((products: IProduct[]) => {
      this.products = products;
    }).finally(() => {
      loading.dismiss();
    });

  }

  refreshProducts(event: CustomEvent) {
    this.loadData();
    (event.target as HTMLIonRefresherElement).complete();
  }

  goToProduct(product: IProduct){
    this.router.navigate(['product', product._id]);
  }

}
