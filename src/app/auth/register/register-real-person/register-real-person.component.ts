import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInputComponent } from 'src/app/core/components/password-input/password-input.component';
import { CaptchaComponent } from 'src/app/core/components/captcha/captcha.component';
import { NgxOtpInputConfig, NgxOtpInputModule } from 'ngx-otp-input';
import { PasswordStrengthBarComponent } from 'src/app/core/components/password-strength-bar/password-strength-bar.component';

@Component({
  selector: 'app-register-real-person',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordInputComponent, CaptchaComponent, NgxOtpInputModule, PasswordStrengthBarComponent],
  templateUrl: './register-real-person.component.html',
  styleUrls: ['./register-real-person.component.scss']
})
export class RegisterRealPersonComponent {
  captchaData: any = {
    "captchaBase64Data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1nz/+m/8A5G/+3Uef/wBN/wDyN/8AbqPP/wCm/wD5G/8At1Hn/wDTf/yN/wDbqzNw8/8A6b/+Rv8A7dR5/wD03/8AI3/26mS3TRwu6u0rKpIjScZY+gzMBk+5AriLvV9YPiywS8l+xRySRgQRagzApu43/vguS27uM9MPjBaVyW7Hdef/ANN//I3/ANuo8/8A6b/+Rv8A7dXP+KvEU+j2sItZk86YtgvKCAAOf+W+QeQc7WUYwcZFZd1b6voujw6p/wAJFevLAoaW2urlSrFiAFJEx5AJBxuLHpg4osDZ2nn/APTf/wAjf/bqPP8A+m//AJG/+3VzF74veDwxa3ySxi8uMKEklwvynDsQJyQvB5PTcu7vSW+iapLZGS48TajHdSkSGM3A2R5wWQhZwTzuGVZccY6UWC/Y6jz/APpv/wCRv/t1Hn/9N/8AyN/9urI1Wzv9RuoBDrctlax/Mwglw7NnnJ87pg/geeeMYcl/qGheKLaxTWp7yG6Me5bqdXMalsfwzA54bk7RyPvFTQlcG7HZ+f8A9N//ACN/9uo8/wD6b/8Akb/7dWJ4h1HU4bOaOwhV08otLcyX3lqi98Yn3ZwDzxjIIzyKg8GahPdaLJJc30k0onYFpLksw4Xjmbj6YX6H7xLaBfWx0Xn/APTf/wAjf/bqPP8A+m//AJG/+3Uef/03/wDI3/26jz/+m/8A5G/+3Uig8/8A6b/+Rv8A7dRR5/8A03/8jf8A26igA8//AKb/APkb/wC3Uef/ANN//I3/ANuo8/8A6b/+Rv8A7dR5/wD03/8AI3/26gA8/wD6b/8Akb/7dXG+IbjHjjRz9oxjZz5/TLkf89xjPTqM9Pn+7XXyzSGFxDcqspU7GeTcAexI88ZHtkVyl5pviC91a11GSTTBNbfcC30gU855+fI98EZ6HIprcmV2jR8U6Y+saaPIuCbi3zJGnn/fOPujM+0EkDDEHHPTJNYmr6h4jTwyba6sIViACTTDUyzbOg6zZJ+7nJbdyMHdiupaXVX0kgXNqmo4zlZmMXXpzLnpxnHXtWRd6Xq+tyRDVdQtoLeJhut7adnSddwLBw0o5+Xg84yfxa7A11OU1KW7g0bQo2uDBGsbSxSeYnysWJ3czgcDYeQgGfvDJC7finTbHR7CO902VrO7aXZ5kNyFd8qcjJm3Z4z8oJ9sZI3dW0W31Owt7ZbySF7bHkSm4LlMY5wZ/mOBjcckZJ9c576VrOpWttYanf2y2cO0sYrppJJtvGH3yc5659cGi5PKa+n67FcaFDqVxdJEpX9432gYDA7TjE56kcDr2IzxXP6YLrxLrcetXU3l2Vs5FspkKlgGbHHnZVgdu45IbGMelvXtHvr82kFpcwPp8Eew21xeOA5HTcRIS3AGDkEc881aSfxOoVB/YyIMAbbqU7R7DzB+VGg7PqaWq3GNHvj9oxi3k58/GPlP/TcfzH1rD8CT48Puvn42zsNvnfd4U9POGOv91eucHO46ernV5kaKwnsmgljKOJ7h0dSc5IZZj2PoMY6nPFDw5Zaxo8aWks1j9jDMzFLt2fJHYeYqgZx0Hr3OaQ3e9zo/P/6b/wDkb/7dR5//AE3/API3/wBuo8//AKb/APkb/wC3Uef/ANN//I3/ANupFB5//Tf/AMjf/bqKPP8A+m//AJG/+3UUAHn/APTf/wAjf/bqPP8A+m//AJG/+3UUUAHn/wDTf/yN/wDbqPP/AOm//kb/AO3UUUAHn/8ATf8A8jf/AG6jz/8Apv8A+Rv/ALdRRQAef/03/wDI3/26jz/+m/8A5G/+3UUUAHn/APTf/wAjf/bqPP8A+m//AJG/+3UUUAHn/wDTf/yN/wDbqPP/AOm//kb/AO3UUUAHn/8ATf8A8jf/AG6jz/8Apv8A+Rv/ALdRRQAef/03/wDI3/26iiigD//Z",
    "salt": "0E-84-8D-83-8C-7D-DB-1F-A1-7C-1A-CC-48-24-24-18",
    "hashedCaptcha": "09:48:MDkvMTIvMjAyNCAwOTo0ODozOQ==:0A-03-50-AF-67-B2-13-71-77-75-FC-18-21-96-6A-4C-85-06-93-45-71-17-10-F1-12-01-15-77-39-C5-EB-8D"
  }

  form: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required])
  })
  otpForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required])
  })
  public step: number = 1;

  otpOptions: NgxOtpInputConfig = {
    otpLength: 5
  };
  isValidPassPattern: boolean = false;

  constructor() { }


  public onNextStep(nextStep: number): void {
    this.step = nextStep;
  }
  public onGoToPrevStep(prevStep: number): void {
    this.step = prevStep;
  }

  public otpComplete(e: any): void {
  }

  onCheckPassPattern(e: boolean) {
    this.isValidPassPattern = e;
  }
}
