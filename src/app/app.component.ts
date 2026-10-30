import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform} from '@ionic/angular'
import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  private platform = inject(Platform);
  private translateService = inject(TranslateService);

  ngOnInit(): void {

    this.platform.ready().then( async () => {

      const language: GetLanguageCodeResult = await Device.getLanguageCode();

      if(language.value){
        this.translateService.use(language.value);
      }



    })

  }

}
