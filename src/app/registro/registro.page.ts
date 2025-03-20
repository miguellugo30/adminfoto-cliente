import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonImg, IonItem, IonList, IonButton, IonInput, IonFooter, IonAlert, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { RegistroService } from '../services/registro.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonLabel, IonAlert, IonFooter, IonInput, IonButton, IonList, IonItem, IonImg, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  public formLogin!: FormGroup;

  public submitted: boolean = false;

  public isAlertOpen = false;

  public alertButtons = ['OK'];

  public message: string = '';

  public email: string = '';

  public num_referencia: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private registroService:  RegistroService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildFormLogin();
  }

  private buildFormLogin() {
    return new Promise( (resolve, reject) => {
      this.formLogin = this.formBuilder.group({
        email: new FormControl(null, Validators.required),
        nombre: new FormControl(null, Validators.required),
        apellido_ma: new FormControl(null, Validators.required),
        apellido_pa: new FormControl(null, Validators.required),
        num_referencia: new FormControl(null, Validators.required),
      });
      resolve(true);
    } )
  }

  get f() { return this.formLogin.controls; }

  async registro() {

    const email = this.f['email'].value; // Get the username from the form
    const num_referencia = this.f['num_referencia'].value; // Get the password from the form

    if (email === null || num_referencia === null) {
      this.setOpen(true);
      this.message = "Debe ingresar los datos solicitados";
    } else {
      const response = await this.registroService.registro(email, num_referencia);

      if (response.success) {
        this.router.navigate(['/tabs/home']);
      } else {
        this.setOpen(true);
        this.message = response.message;
      }
    }
  }

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
