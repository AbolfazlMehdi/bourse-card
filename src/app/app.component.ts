import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bourse-card';
form = new FormGroup({
    fundNationalCode: new FormArray([], [Validators.required]),
})
  otpOptions: NgxOtpInputConfig = {
    otpLength: 4,
    autofocus: true
  };

  onChange(event: string[]) {

  }
  otpComplete(e: any) {
  }

  onSubmit() {
    this.form.markAllAsTouched();
  }
}
