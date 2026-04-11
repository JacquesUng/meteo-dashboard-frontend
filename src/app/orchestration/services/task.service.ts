import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

const CONTROLLER = 'task';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly http = inject(HttpClient);

    schedule(configId: string): void {
        this.http.post(`${environment.apiUrl}/api/${CONTROLLER}`, { collectConfigId: configId });
    }

    delete(configId: string): void {
        this.http.delete(`${environment.apiUrl}/api/${CONTROLLER}/${configId}`);
    }
}