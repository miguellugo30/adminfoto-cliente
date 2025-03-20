import { Component, OnInit } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonItem,
    IonLabel,
    IonButton,
    IonRow,
    IonCol,
    IonImg
  } from '@ionic/angular/standalone';

import { ClienteService } from '../services/cliente.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LoadServiceService } from '../services/load-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonItem,
    IonLabel,
    IonButton,
    IonRow,
    IonCol,
    IonImg
  ],
})


export class Tab1Page implements OnInit {

  public cliente: any;

  public recibo: any;

  constructor(
    private clienteService:  ClienteService,
    private localStorage: LocalStorageService,
    private loadService: LoadServiceService,
  ) {}

  ngOnInit(): void {

    this.loadService.showSpinner();
    this.getDataCliente();

    console.log(this.recibo);

  }

  private async getDataCliente() {
    const user = this.localStorage.getItem('currentUsers');

    const response = await this.clienteService.get(user.id);

    if (response.success) {
      this.cliente = response.data.cliente;
      this.recibo = response.data.recibo;

      console.log(this.recibo);

      this.loadService.stopSpinner()
    } else {
      console.log('Error');
    }

  }


}
