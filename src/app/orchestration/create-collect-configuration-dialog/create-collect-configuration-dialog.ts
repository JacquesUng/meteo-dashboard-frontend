import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-collect-configuration-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './create-collect-configuration-dialog.html',
  styleUrl: './create-collect-configuration-dialog.scss',
})
export class CreateCollectConfigurationDialog {
  private readonly dialogRef = inject(MatDialogRef<CreateCollectConfigurationDialog>);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    startDate: [null as Date | null],
    timespan: [1, [Validators.required, Validators.min(1)]]
  });

  protected readonly isValid = toSignal(this.form.statusChanges.pipe(
    map(status => status === 'VALID')
  ))

  onSubmit(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
