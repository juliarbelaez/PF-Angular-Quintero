import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../share/pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      },
    ]),
  ],
  exports: [LoginComponent, AuthComponent],
})
export class AuthModule {}
