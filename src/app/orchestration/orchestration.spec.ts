import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { Orchestration } from './orchestration';
import { CollectConfigurationService } from './services/collect-configuration.service';
import { TaskService } from './services/task.service';
import { ConfirmDeleteDialog } from './confirm-delete-dialog/confirm-delete-dialog';
import { CreateCollectConfigurationDialog } from './create-collect-configuration-dialog/create-collect-configuration-dialog';
import { CollectConfiguration } from './models/orchestration.model';

const stubConfig = (): CollectConfiguration => ({
  Id: 'id-1', name: 'Test', startDate: null, timespan: 1, active: false
});

describe('Orchestration', () => {
  let component: Orchestration;
  let fixture: ComponentFixture<Orchestration>;

  let mockCollectConfigService: { getAll: ReturnType<typeof vi.fn>; createOne: ReturnType<typeof vi.fn>; deleteOne: ReturnType<typeof vi.fn> };
  let mockTaskService: { schedule: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };
  let mockDialogRef: { afterClosed: ReturnType<typeof vi.fn> };
  let dialogOpenSpy: ReturnType<typeof vi.spyOn>;
  let mockResource: { value: ReturnType<typeof signal<CollectConfiguration[] | undefined>>; reload: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockResource = { value: signal<CollectConfiguration[] | undefined>([]), reload: vi.fn() };
    mockDialogRef = { afterClosed: vi.fn().mockReturnValue(of(undefined)) };
    mockCollectConfigService = {
      getAll: vi.fn().mockReturnValue(mockResource),
      createOne: vi.fn().mockResolvedValue({}),
      deleteOne: vi.fn().mockResolvedValue(undefined)
    };
    mockTaskService = {
      schedule: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined)
    };

    await TestBed.configureTestingModule({
      imports: [Orchestration],
      providers: [
        { provide: CollectConfigurationService, useValue: mockCollectConfigService },
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Orchestration);
    component = fixture.componentInstance;
    await fixture.whenStable();

    dialogOpenSpy = vi.spyOn((component as any).dialog, 'open').mockReturnValue(mockDialogRef as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickOnDelete', () => {
    it('should open the confirmation dialog', async () => {
      mockDialogRef.afterClosed.mockReturnValue(of(false));
      await component.onClickOnDelete('id-1');
      expect(dialogOpenSpy).toHaveBeenCalledWith(ConfirmDeleteDialog, { disableClose: true });
    });

    it('should delete and reload when confirmed', async () => {
      mockDialogRef.afterClosed.mockReturnValue(of(true));
      await component.onClickOnDelete('id-1');
      expect(mockCollectConfigService.deleteOne).toHaveBeenCalledWith('id-1');
      expect(mockResource.reload).toHaveBeenCalled();
    });

    it('should not delete when cancelled', async () => {
      mockDialogRef.afterClosed.mockReturnValue(of(false));
      await component.onClickOnDelete('id-1');
      expect(mockCollectConfigService.deleteOne).not.toHaveBeenCalled();
    });
  });

  describe('onClickOnCreate', () => {
    it('should open the creation dialog', async () => {
      mockDialogRef.afterClosed.mockReturnValue(of(null));
      await component.onClickOnCreate();
      expect(dialogOpenSpy).toHaveBeenCalledWith(CreateCollectConfigurationDialog, { disableClose: true });
    });

    it('should create and reload when a result is returned', async () => {
      const config = stubConfig();
      mockDialogRef.afterClosed.mockReturnValue(of(config));
      await component.onClickOnCreate();
      expect(mockCollectConfigService.createOne).toHaveBeenCalledWith(config);
      expect(mockResource.reload).toHaveBeenCalled();
    });

    it('should not create when the dialog is cancelled', async () => {
      mockDialogRef.afterClosed.mockReturnValue(of(null));
      await component.onClickOnCreate();
      expect(mockCollectConfigService.createOne).not.toHaveBeenCalled();
    });
  });

  describe('onClickOnSchedule', () => {
    it('should schedule the task and reload', async () => {
      await component.onClickOnSchedule('id-3');
      expect(mockTaskService.schedule).toHaveBeenCalledWith('id-3');
      expect(mockResource.reload).toHaveBeenCalled();
    });
  });

  describe('onClickOnStopTask', () => {
    it('should stop the task and reload', async () => {
      await component.onClickOnStopTask('id-4');
      expect(mockTaskService.delete).toHaveBeenCalledWith('id-4');
      expect(mockResource.reload).toHaveBeenCalled();
    });
  });
});
