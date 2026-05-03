import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCollectConfigurationDialog } from './create-collect-configuration-dialog';

describe('CreateCollectConfigurationDialog', () => {
  let component: CreateCollectConfigurationDialog;
  let fixture: ComponentFixture<CreateCollectConfigurationDialog>;
  let dialogRef: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogRef = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CreateCollectConfigurationDialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MatDialog, useValue: { open: vi.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCollectConfigurationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form validation', () => {
    it('should be invalid when name is empty', () => {
      component.form.patchValue({ name: '', timespan: 1 });
      expect(component.form.valid).toBe(false);
    });

    it('should be valid when name and timespan are provided', () => {
      component.form.patchValue({ name: 'Config A', timespan: 2 });
      expect(component.form.valid).toBe(true);
    });

    it('should be invalid when timespan is less than 1', () => {
      component.form.patchValue({ name: 'Config A', timespan: 0 });
      expect(component.form.valid).toBe(false);
    });
  });

  describe('onSubmit', () => {
    it('should close the dialog with the form values', () => {
      component.form.patchValue({ name: 'My Config', timespan: 3, startDate: null });
      component.onSubmit();
      expect(dialogRef.close).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'My Config', timespan: 3 })
      );
    });
  });
});
