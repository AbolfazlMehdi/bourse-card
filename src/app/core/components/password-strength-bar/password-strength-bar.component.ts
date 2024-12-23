import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-strength-bar',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordStrengthBarComponent),
      multi: true
    }
  ]
})
export class PasswordStrengthBarComponent   {
 

  hasMixedCase: boolean = false;
  hasSymbol: boolean = false;
  hasValidLength: boolean = false;
  @Output()  validator: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input()
  set passwordToCheck(password: string) {
      if (password) { 
          this.validator.emit(this.checkPasswordStrength(password));
      }
  }

  private checkPasswordStrength(password: string): boolean {
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const regex = /[@#+$-/:-?{-~!"^_`\[\]]/g;
    const symbols = regex.test(password);
    const length = /^.{8,25}$/.test(password);

    this.hasMixedCase = lowerLetters && upperLetters;
    this.hasSymbol = symbols;
    this.hasValidLength = length;

   return this.hasMixedCase && this.hasSymbol && this.hasValidLength;
  
  }
}
