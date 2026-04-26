import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CollectConfiguration } from '../models/orchestration.model';

const CONTROLLER = 'collect-configuration';
const GET_ALL = 'all';

@Injectable({ providedIn: 'root' })
export class CollectConfigurationService {

  getAll() {
    return httpResource<CollectConfiguration[]>(() => `${environment.apiUrl}/api/${CONTROLLER}/${GET_ALL}`);
  }

  async deleteOne(id: string): Promise<void> {
    await fetch(`${environment.apiUrl}/api/${CONTROLLER}/${id}`, { method: 'DELETE' });
  }
}
