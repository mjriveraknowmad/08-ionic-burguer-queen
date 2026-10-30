import { Component, inject } from '@angular/core';
import {
  IonContent,
  LoadingController,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg
} from '@ionic/angular/standalone';
import { CategoriesService } from 'src/app/services/categories.service';
import { ICategory } from 'src/app/models/category.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    TranslatePipe
  ]
})
export class CategoriesPage {

  private categoriesService: CategoriesService = inject(CategoriesService);
  private loadingCtrl: LoadingController = inject(LoadingController);
  private translateService: TranslateService = inject(TranslateService);

  public categories: ICategory[] = [];

  async ionViewWillEnter() {
    this.loadData();
  }

  async loadData(){

    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading')
    });

    loading.present();

    this.categoriesService.getCategories().then( (categories: ICategory[]) => {
      this.categories = categories;
      console.log(this.categories);
    }).finally(() => {
      loading.dismiss();
    })

  }

  refreshCategories(event: CustomEvent){
    this.loadData();
    (event.target as HTMLIonRefresherElement).complete();
  }

}
