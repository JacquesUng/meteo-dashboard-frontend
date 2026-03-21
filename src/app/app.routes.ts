import { Routes } from '@angular/router';
import { Orchestration } from './orchestration/orchestration';

export const routes: Routes = [
    {
        path: 'orchestration',
        component: Orchestration,
    },
    {
        path: '**',
        redirectTo: 'orchestration'
    }
];
