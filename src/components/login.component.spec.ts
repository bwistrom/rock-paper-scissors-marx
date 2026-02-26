import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
  });

  describe('Form Validation', () => {
    it('should invalidate empty username', () => {
      const control = component.loginForm.get('username');
      control?.setValue('');
      expect(control?.hasError('required')).toBeTruthy();
    });

    it('should invalidate username with less than 3 characters', () => {
      const control = component.loginForm.get('username');
      control?.setValue('ab');
      expect(control?.hasError('minlength')).toBeTruthy();
    });

    it('should invalidate username with special characters', () => {
      const control = component.loginForm.get('username');
      control?.setValue('user@name');
      expect(control?.hasError('pattern')).toBeTruthy();
    });

    it('should validate correct username', () => {
      const control = component.loginForm.get('username');
      control?.setValue('validUser123');
      expect(control?.valid).toBeTruthy();
    });

    it('should accept underscores in username', () => {
      const control = component.loginForm.get('username');
      control?.setValue('valid_user_123');
      expect(control?.valid).toBeTruthy();
    });
  });

  describe('getErrorMessage', () => {
    it('should return required error message', () => {
      const control = component.loginForm.get('username');
      control?.setValue('');
      control?.markAsTouched();
      expect(component.getErrorMessage()).toContain('required');
    });

    it('should return minlength error message', () => {
      const control = component.loginForm.get('username');
      control?.setValue('ab');
      control?.markAsTouched();
      expect(component.getErrorMessage()).toContain('at least');
    });

    it('should return pattern error message', () => {
      const control = component.loginForm.get('username');
      control?.setValue('user@');
      control?.markAsTouched();
      expect(component.getErrorMessage()).toContain('letters');
    });
  });

  describe('handleSubmit', () => {
    it('should emit onLogin event with valid username', (done) => {
      component.onLogin.subscribe((username: string) => {
        expect(username).toBe('testuser');
        done();
      });

      component.loginForm.get('username')?.setValue('testuser');
      component.handleSubmit();
    });

    it('should not emit onLogin event with invalid form', () => {
      let emitted = false;
      component.onLogin.subscribe(() => {
        emitted = true;
      });

      component.loginForm.get('username')?.setValue('ab');
      component.handleSubmit();
      expect(emitted).toBeFalsy();
    });
  });
});
