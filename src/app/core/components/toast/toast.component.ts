import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastMessageService } from './services/toast-message.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  public autohide = true;
  constructor(public toastService: ToastMessageService) { }

  public isTemplate(toast: any): boolean { return toast.content instanceof TemplateRef; }
  public isHeaderTemplate(toast: any): boolean { return toast.title instanceof TemplateRef; }
  public isArray(toast: any): boolean { return Array.isArray(toast.content); }
}
