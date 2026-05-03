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

  async createOne(config: CollectConfiguration): Promise<CollectConfiguration> {
    const response = await fetch(
      `${environment.apiUrl}/api/${CONTROLLER}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      }
    )
    return response.json();
  }

  async deleteOne(id: string): Promise<void> {
    await fetch(`${environment.apiUrl}/api/${CONTROLLER}/${id}`, { method: 'DELETE' });
  }
}
