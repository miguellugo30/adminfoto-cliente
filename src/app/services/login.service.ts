import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authState = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  async login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}auth/login-cliente`, { email, password }).toPromise()
      .then(async (res: any) => {
        if (res.success) {
          await this.localStorage.setItem('currentUsers', JSON.stringify(res.user));
          //await this.localStorage.setItem('token',res.token);
          this.authState.next(true);
          return res;

        } else {
          return res;
        }
    });
  }

  isAuthenticated() {
    return this.authState.asObservable();
  }
}
