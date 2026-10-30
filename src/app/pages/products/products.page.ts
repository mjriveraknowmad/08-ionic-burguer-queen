import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductsPage {

  private router: Router = inject(Router);

  @Input() idCategory!: string;

  ionViewWillEnter(){

    console.log(this.idCategory);
    

    if(this.idCategory){

    }else{
      this.router.navigateByUrl('categories')
    }


  }


}
