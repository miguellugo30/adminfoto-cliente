import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
        private localStorage: LocalStorageService,
  ) { }

  async get(userId: number ) {
        return this.http.get(`${environment.apiUrl}cliente/` + userId).toPromise()
          .then(async (res: any) => {
            if (res.success) {

              this.localStorage.setItem('cliente', JSON.stringify(res.data.cliente));
              this.localStorage.setItem('recibo', JSON.stringify(res.data.recibo));
              return res;

            } else {
              return res;
            }
        });
      }
}
