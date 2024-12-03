import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-preparation-time',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreparationTimeComponent),
      multi: true
    }
  ],
  template: `
    <div class="preparation-time-container">
      <mat-form-field appearance="outline" class="time-input">
        <mat-label>Preparation Time</mat-label>
        <input
          matInput
          [value]="formatTime(value)"
          readonly
          [disabled]="disabled"
        >
      </mat-form-field>
      
      <mat-slider
        class="time-slider"
        [min]="1"
        [max]="60"
        [step]="1"
        [disabled]="disabled"
        [discrete]="true"
      >
        <input
          matSliderThumb
          [value]="value"
          (valueChange)="onSliderChange($event)"
        >
      </mat-slider>
    </div>
  `,
  styles: [`
    .preparation-time-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .time-input {
      width: 100%;
    }

    .time-slider {
      width: 100%;
      margin-top: -16px;
    }

    :host ::ng-deep {
      .mdc-slider {
        margin: var(--spacing-md) 0;
      }
    }
  `]
})
export class PreparationTimeComponent implements ControlValueAccessor {
  value: number = 30;
  disabled: boolean = false;
  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  formatTime(minutes: number): string {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }

  onSliderChange(value: number): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}