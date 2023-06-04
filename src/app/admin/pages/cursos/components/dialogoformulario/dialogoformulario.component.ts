import { Component, Inject } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialogoformulario",
  templateUrl: "./dialogoformulario.component.html",
  styleUrls: ["./dialogoformulario.component.scss"],
})
export class DialogoformularioComponent {
  nombreControl = new FormControl("", [Validators.required]);
  fechaInicioControl = new FormControl("", [Validators.required]);
  fechaFinControl = new FormControl("", [Validators.required]);

  cursosForm = new FormGroup({
    nombre: this.nombreControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaInicioControl,
  });

  constructor(
    private dialogRef: MatDialogRef<DialogoformularioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const cursoParaEditar = data.curso;
      this.nombreControl.setValue(cursoParaEditar.nombre);
      this.fechaInicioControl.setValue(cursoParaEditar.fechaInicio);
      this.fechaFinControl.setValue(cursoParaEditar.fechaFin);
    }
  }

  guardar(): void {
    if (this.cursosForm.valid) {
      this.dialogRef.close(this.cursosForm.value);
    } else {
      this.cursosForm.markAllAsTouched();
    }
  }
}
