import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RegisterLegalPersonComponent } from "./register-legal-person/register-legal-person.component";
import { RegisterRealPersonComponent } from "./register-real-person/register-real-person.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, RegisterLegalPersonComponent, RegisterRealPersonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public customerType = [
    { value: 1, title: 'حقیقی' },
    { value: 2, title: 'حقوقی' },
  ]
  public customerTypeValue: number = 1;


}
