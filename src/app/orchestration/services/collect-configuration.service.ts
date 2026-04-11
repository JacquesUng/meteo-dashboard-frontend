import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CollectConfiguration } from '../models/orchestration.model';

const CONTROLLER = 'collect-configuration';
const GET_ALL = 'all';

@Injectable({ providedIn: 'root' })
export class CollectConfigurationService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<CollectConfiguration[]> {
    return this.http.get<CollectConfiguration[]>(`${environment.apiUrl}/api/${CONTROLLER}/${GET_ALL}`);
  }
}
