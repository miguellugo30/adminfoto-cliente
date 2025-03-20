import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  async registro(email: string, num_referencia: string) {
      return this.http.post(`${environment.apiUrl}registro`, { email, num_referencia }).toPromise()
        .then(async (res: any) => {
          if (res.success) {
            //await this.localStorage.setItem('currentUsers', JSON.stringify(res.user));
            //await this.localStorage.setItem('token',res.token);
            return res;

          } else {
            return res;
          }
      });
    }
}
