import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadServiceService {

  constructor(
    private loading: LoadingController
  ) { }

  public async showSpinner() {
    let loadingUI = await this.loading.create({
      spinner: "lines-sharp",
      mode: 'ios'
    })

    await loadingUI.present();
  }


  public async stopSpinner() {
    await this.loading.dismiss();
  }
}
