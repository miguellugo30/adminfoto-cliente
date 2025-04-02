import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonRow,
    IonCol,
    IonImg,
    IonLoading,
    LoadingController,
    IonModal,
    IonTitle,
    IonButtons
  } from '@ionic/angular/standalone';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { ClienteService } from '../services/cliente.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LoadServiceService } from '../services/load-service.service';
import { responseCliente } from '../models/cliente';

declare var MercadoPago: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonLoading,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonRow,
    IonCol,
    IonImg,
    CommonModule,
    IonModal,
    IonTitle,
    IonButtons
  ],
  providers: [InAppBrowser]
})

export class Tab1Page implements OnInit, AfterViewInit {

  mercadoPago: any;

  isModalOpen = false;

  public cliente: any;

  public recibo: any;

  public response: any;

  public show:boolean = false;

  constructor(
    private clienteService:  ClienteService,
    private localStorage: LocalStorageService,
    private loadService: LoadServiceService,
    private iab: InAppBrowser,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.loadService.showSpinner();
    this.getDataCliente();
  }

  ngAfterViewInit() {
    if (typeof MercadoPago !== 'undefined') {
      this.mercadoPago = new MercadoPago('TEST-09356d14-6130-458e-8f89-283ad1a6d85d', {
        locale: 'es-MX'
      });
      //setTimeout(() => this.loadCardForm(), 500);
    } else {
      console.error("MercadoPago SDK no está cargado");
    }

  }

  private  getDataCliente() {

    const user = this.localStorage.getItem('currentUsers');
    this.clienteService.get(user.id).subscribe( (response: responseCliente) => {
      if (response.success) {
        this.cliente = response.data.cliente[0];
        this.recibo = response.data.recibo[0];
        this.loadService.stopSpinner();
        this.show = true;
      } else {
        console.log('Error');
      }
    });

  }

  abrirPDF() {
    const url = 'http://admigas_prod.test/departamentos/show_recibo_app/'+ this.recibo.admigas_departamentos_id +'/' + this.recibo.clave_recibo; // Reemplaza con la URL de tu PDF
    this.iab.create(url, '_system'); // '_system' lo abre en el navegador externo
  }

  loadCardForm() {

    this.mercadoPago.bricks().create('cardPayment', 'mercadopago-card-form', {
      initialization: { amount: 1000 },
      callbacks: {
        onReady: () => {
          console.log("Brick de Mercado Pago cargado correctamente.");
        },
        onError: (error: any) => {
          console.error("Error en Mercado Pago Bricks:", error);
        },
        onSubmit: (cardData: { token: any; paymentMethodId: any; }) => {
          /*
          this.http.post("http://localhost:8000/api/process_payment", {
            token: cardData.token,
            payment_method_id: cardData.paymentMethodId,
            email: "comprador@example.com",
            amount: 1000,
            description: "Producto de prueba"
          }).subscribe((response: any) => {
            if (response.status === "success") {
              alert("Pago exitoso");
            } else {
              alert("Error en el pago: " + response.message);
            }
          });
          */
        }
      }
    });

  }

  public pagar() {
    this.isModalOpen = true;
    this.loadCardForm();
  }

}
