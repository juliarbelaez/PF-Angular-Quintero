import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/share/pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServiceService } from '../../services/auth-service.service';
import { AuthServiceMock } from '../../mocks/auth-service.mock';

describe('Pruebas de LoginComponent', () => {
  let component: LoginComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        PipesModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: AuthServiceService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Si el campo email está vacío el FormControl del email debe ser invalido', () => {
    component.loginForm.setValue({ email: '', password: null });
    expect(component.emailControl.invalid).toBeTrue();
  });

  it('Si el campo password está vacío el FormControl del password debe ser invalido', () => {
    component.loginForm.setValue({ email: '', password: null });
    expect(component.passwordControl.invalid).toBeTrue();
  });
  it('Si el loginForm es invalido, debe marcar todos los controles como toched', () => {
    component.loginForm.setValue({ email: null, password: null });
    const spyOnMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );
    component.onSubmit();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });
  it('Si el loginForm es válido, debe llamar al método login del AuthService', () => {
    component.loginForm.setValue({
      email: 'test@mail.com',
      password: '12345678',
    });
    const spyOnAuthServiceLogin = spyOn(
      TestBed.inject(AuthServiceService),
      'login'
    );
    component.onSubmit();
    expect(component.loginForm.valid).toBeTrue();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
