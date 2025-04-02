import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { responseCliente } from '../models/cliente';
import { lastValueFrom } from 'rxjs';
import { LoadServiceService } from './load-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private loadService: LoadServiceService,
  ) { }

  public  get(userId: number ) {
    return this.http.get<responseCliente>(`${environment.apiUrl}cliente/` + userId);
  }
}
