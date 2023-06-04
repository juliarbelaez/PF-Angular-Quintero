import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PipesModule } from '../../../share/pipes/pipes.module';
import { DirectivesModule } from '../../../share/directives/directives.module';
import { DialogoformularioComponent } from './components/dialogoformulario/dialogoformulario.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CursosDetalleComponent } from './components/cursos-detalle/cursos-detalle.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CursosComponent,
    DialogoformularioComponent,
    CursosDetalleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    PipesModule,
    DirectivesModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  exports: [CursosComponent],
})
export class CursosModule {}
