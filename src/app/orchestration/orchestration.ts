import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CollectConfigurationService } from './services/collect-configuration.service';
import { TaskService } from './services/task.service';
import { CollectConfiguration } from './models/orchestration.model';

@Component({
  selector: 'app-orchestration',
  imports: [MatTableModule, MatIconButton, MatIconModule],
  templateUrl: './orchestration.html',
  styleUrl: './orchestration.scss',
})
export class Orchestration {
  private readonly collectConfigurationService = inject(CollectConfigurationService);
  readonly taskService = inject(TaskService);

  readonly configurations = toSignal(this.collectConfigurationService.getAll(), { initialValue: [] });
  readonly displayedColumns: (keyof CollectConfiguration | 'actions')[] = ['Id', 'name', 'startDate', 'timespan', 'actions'];
}
