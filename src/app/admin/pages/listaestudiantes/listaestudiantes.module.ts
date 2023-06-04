import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListaestudiantesComponent } from "./listaestudiantes.component";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "src/app/share/share.module";
import { PipesModule } from "../../../share/pipes/pipes.module";
import { DirectivesModule } from "../../../share/directives/directives.module";
import { DialogoformularioModule } from "./dialogoformulario/dialogoformulario.module";
import { EstudianteDetalleComponent } from "./pages/estudiante-detalle/estudiante-detalle.component";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RoleGuard } from "../../../auth/guards/role.guard";

@NgModule({
  declarations: [ListaestudiantesComponent, EstudianteDetalleComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ShareModule,
    PipesModule,
    DirectivesModule,
    DialogoformularioModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: "",
        component: ListaestudiantesComponent,
      },
      {
        path: ":id",
        component: EstudianteDetalleComponent,
        canActivate: [RoleGuard],
      },
    ]),
  ],
  exports: [ListaestudiantesComponent],
})
export class ListaestudiantesModule {}
