import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

const CONTROLLER = 'task';

@Injectable({ providedIn: 'root' })
export class TaskService {

    async schedule(configId: string): Promise<void> {
        return fetch(`${environment.apiUrl}/api/${CONTROLLER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collectConfigId: configId })
        }).then(() => void 0);
    }

    async delete(configId: string): Promise<void> {
        return fetch(`${environment.apiUrl}/api/${CONTROLLER}/${configId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => void 0);
    }
}