import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { RoleGuard } from "../../../../auth/guards/role.guard";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-dialogoformulario",
  templateUrl: "./dialogoformulario.component.html",
  styleUrls: ["./dialogoformulario.component.scss"],
  providers: [RoleGuard],
})
export class DialogoformularioComponent {
  estudiantes: any[] = [];

  idControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(10),
  ]);
  nombreControl = new FormControl("", [Validators.required]);
  apellidoControl = new FormControl("", [Validators.required]);
  cursoControl = new FormControl("", Validators.required);
  emailControl = new FormControl("", [Validators.required, Validators.email]);
  fecharegistro = new FormControl("", Validators.required);
  estudiantesForm = new FormGroup({
    id: this.idControl,
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    curso: this.cursoControl,
    email: this.emailControl,
    fecharegistro: this.fecharegistro,
  });

  constructor(
    private dialogRef: MatDialogRef<DialogoformularioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.idControl.setValue(data.editedEstudiante.id);
      this.nombreControl.setValue(data.editedEstudiante.nombre);
      this.apellidoControl.setValue(data.editedEstudiante.apellido);
      this.cursoControl.setValue(data.editedEstudiante.curso);
      this.emailControl.setValue(data.editedEstudiante.email);
      this.fecharegistro.setValue(data.editedEstudiante.fecharegistro);
    }
  }
  guardar(): void {
    if (this.estudiantesForm.valid) {
      this.dialogRef.close(this.estudiantesForm.value);
    } else {
      this.estudiantesForm.markAllAsTouched();
    }
  }
}
