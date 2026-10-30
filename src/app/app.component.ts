import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform} from '@ionic/angular'
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    ToolbarComponent,
    FooterComponent
  ],
})
export class AppComponent implements OnInit {

  private platform = inject(Platform);
  private translateService = inject(TranslateService);
  private router: Router = inject(Router);

  ngOnInit(): void {

    this.platform.ready().then( async () => {

      const language: GetLanguageCodeResult = await Device.getLanguageCode();

      if(language.value){
        this.translateService.use(language.value);
      }

      this.checkNetWork();



    })

  }

  checkNetWork(){
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(!status.connected){
        this.router.navigateByUrl('/not-network')
      }else{
        this.router.navigateByUrl('/categories')
      }
    });
  }

}
