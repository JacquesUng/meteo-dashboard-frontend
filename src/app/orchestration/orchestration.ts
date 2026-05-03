import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CollectConfigurationService } from './services/collect-configuration.service';
import { TaskService } from './services/task.service';
import { CollectConfiguration } from './models/orchestration.model';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCollectConfigurationDialog } from './create-collect-configuration-dialog/create-collect-configuration-dialog';

@Component({
  selector: 'app-orchestration',
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './orchestration.html',
  styleUrl: './orchestration.scss',
})
export class Orchestration {
  private readonly collectConfigurationService = inject(CollectConfigurationService);
  private readonly taskService = inject(TaskService);
  private readonly dialog = inject(MatDialog);

  readonly collectionConfigurationResource = this.collectConfigurationService.getAll();
  readonly configurations = computed(() => this.collectionConfigurationResource.value() ?? []);

  readonly displayedColumns: (keyof CollectConfiguration | 'actions')[] = ['Id', 'name', 'startDate', 'timespan', 'actions'];

  async onClickOnSchedule(id: string): Promise<void> {
    await this.taskService.schedule(id);
    this.collectionConfigurationResource.reload();
  }

  async onClickOnStopTask(id: string): Promise<void> {
    await this.taskService.delete(id);
    this.collectionConfigurationResource.reload();
  }

  async onClickOnDelete(id: string): Promise<void> {
    await this.collectConfigurationService.deleteOne(id);
    this.collectionConfigurationResource.reload();
  }

  onClickOnCreate(): void {
    this.dialog.open(CreateCollectConfigurationDialog, { disableClose: true }).afterClosed().subscribe({
      next: (result: CollectConfiguration) => {
        if (result) {
          this.collectConfigurationService.createOne(result);
          this.collectionConfigurationResource.reload();
        }
      }
    });
  }
}
