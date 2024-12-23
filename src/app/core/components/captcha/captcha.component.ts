import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";
import {CaptchaModel} from "./models/captcha.model";
import * as workerTimers from 'worker-timers';
@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => CaptchaComponent
      ),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CaptchaComponent),
      multi: true,
    }
  ]
})
export class CaptchaComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {

  @Input() disabled: boolean = false;
  @Input()captcha!: CaptchaModel;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = 'عبارت امنیتی';

  @Output() changed: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('captchaInput') captchaInput!: ElementRef;
 

  private captchaModel: {
    hash: string;
    salt: string;
    value: string;
  };

  public captchaTimerPercent: number = 100;
  public captchaTimerEnded: boolean = false;
  private timerHandler: number | undefined = undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.captchaModel = {
      hash: '',
      salt: '',
      value: ''
    };
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['captcha'] && changes['captcha'].currentValue) {
      this.startTimer();
    }

  }

  ngOnInit(): void {

  }




  onChange: any = (value: any) => {
  };

  onTouch: any = () => {
  };

  onValidatorChange: any = () => {
  };

  get value(): any {
    return this.captchaModel.value;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    this.captchaModel.value = v;
    this.onChange({
      hash: this.captcha ? this.captcha.hashedCaptcha : '',
      salt: this.captcha ? this.captcha.salt : '',
      value: typeof (v) === 'string' ? v : null
    });
    this.onValidatorChange();

  }
  writeValue(obj: any): void {
    this.value = obj;

    if (this.captchaModel) {
      this.captchaModel = {
        hash: this.captcha ? this.captcha.hashedCaptcha : '',
        salt: this.captcha ? this.captcha.salt : '',
        value: typeof (obj) === 'string' ? obj : ''
      };
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnValidatorChange?(fn: any): void {
    this.onValidatorChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let valid = true;

    valid = !!(this.value && this.value !== '' && this.captchaModel.value && this.captchaModel.value !== '');

    setTimeout(() => {
      this.setInputClasses();
    }, 10);

    return valid ? null : {invalid: true, required: true};
  }


  changeCaptcha(): void {
    this.captchaTimerPercent = 100;
    this.changed.emit(Math.random());
  }

  private clearTimer = () => {
    if (this.timerHandler) {
      workerTimers.clearInterval(this.timerHandler);
      this.timerHandler = undefined;
    }
  }

  private startTimer(duration = Math.ceil(120 * 10)): void {
    this.captchaTimerEnded = false;
    if (this.timerHandler) {
      this.clearTimer();
    }

    const scale = 100 / duration;
    let t = duration;
    this.timerHandler = workerTimers.setInterval(() => {
      this.captchaTimerPercent = Math.round(t * scale);
      if (--t < 0) {
        this.clearTimer();
        this.captchaTimerEnded = true;
      }
    }, Math.ceil(1000 / 10));
  }

  setInputClasses(): void {
    if (this.captchaInput) {
      const hostClasses = this.elementRef.nativeElement.getAttribute('class');
      if (hostClasses) {
        this.renderer.setAttribute(this.captchaInput.nativeElement, 'class', `${hostClasses + ' form-control '}`);
      }
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }


}
