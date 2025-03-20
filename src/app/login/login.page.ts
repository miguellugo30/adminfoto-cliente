import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonImg, IonItem, IonList, IonButton, IonInput, IonFooter, IonAlert } from '@ionic/angular/standalone';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonAlert, IonFooter, IonInput, IonButton, IonList, IonItem, IonImg, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  public formLogin!: FormGroup;

  public submitted: boolean = false;

  public isAlertOpen = false;

  public alertButtons = ['OK'];

  public message: string = '';

  public email: string = '';

  public password: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private loginService:  LoginService,
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
        password: new FormControl(null, Validators.required),
      });
      resolve(true);
    } )
  }

  get f() { return this.formLogin.controls; }

  async login() {

      const email = this.f['email'].value; // Get the username from the form
      const password = this.f['password'].value; // Get the password from the form

      if (email === null || password === null) {
        this.setOpen(true);
        this.message = "Debe ingresar Correo Electrónico y Contraseña";
      } else {
        const response = await this.loginService.login(email, password);

        if (response.success) {
          this.router.navigate(['/tabs/home']);
        } else {
          this.setOpen(true);
          this.message = response.message;
        }
      }
  }

  public register(){
    this.router.navigate(['/registro']);
  }

  public setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
