import {Injectable, TemplateRef,} from "@angular/core";


@Injectable({providedIn: 'root'})
export class ToastMessageService {
  toasts: any[] = [];

  constructor() {
  }


  public showMessageToast(content: string | string[] | TemplateRef<any>,
                          toastType: 'success' | 'info' | 'warning' | 'error' | 'secondary' | 'white' | 'primary' = 'success',
                          title: string | TemplateRef<any> = '', options: ToastOptions =
                            {delay: 5000, autoHide: true}): void {
    const message: string[] | TemplateRef<any>= typeof content === 'string'? [content]: content
    this.toasts.push({content: message, title, type: toastType === 'error' ? 'danger' : toastType, ...options});
  }


  public showErrorMessages(error: ProblemDetail | ValidationProblemDetail, showErrorToast: boolean = true): string | string[] {
    let errorMessage: string | string[] = '';
    const errors = (error as ValidationProblemDetail).errors;
    if (error.status === 502 || error.status === 503) {
      errorMessage = ['سرویس در دسترس نیست.'];
    } else {
      if ((error as ValidationProblemDetail).errors && JSON.stringify(errors) !== '{}') {
        errorMessage = this.handelErrors(error);
      } else {
        errorMessage = [error?.detail +  `(${error?.title})`];
      }
    }
    if (showErrorToast) {
      this.showMessageToast(errorMessage, 'error');
    }

    return errorMessage
  }

 public remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  public removeAll(): void {
    this.toasts = [];
  }


  private handelErrors(error: any): any {
    return Object.keys(error.errors).flatMap((key: any) => {
      const errors: any = error.errors;
      errors[key] = errors[key].map((item: any) => `- ${item}`);
      return errors[key]
    })
  }

}

interface ProblemDetail {
  type: string | undefined
  title: string | undefined;
  status: number | undefined;
  detail: string | undefined;
  instance: string | undefined;

  [key: string]: any;
}


interface ValidationProblemDetail extends ProblemDetail {
  errors: { [key: string]: string[]; } | undefined;
}


interface ToastOptions {
  delay?: number;
  autoHide: boolean
}
