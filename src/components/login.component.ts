import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['../styles/Login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  @Output() onLogin = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]
      ]
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value.trim();
    this.onLogin.emit(username);
    this.loginForm.reset();
  }

  get usernameControl() {
    return this.loginForm.get('username');
  }

  getErrorMessage(): string {
    const control = this.usernameControl;
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Username is required';
    }
    if (control.hasError('minlength')) {
      return `Username must be at least ${control.getError('minlength').requiredLength} characters`;
    }
    if (control.hasError('pattern')) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return '';
  }
}
