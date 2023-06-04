import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InscripcionesComponent } from "./inscripciones.component";
import { EffectsModule } from "@ngrx/effects";
import { InscripcionesEffects } from "./store/inscripciones.effects";
import { StoreModule } from "@ngrx/store";
import { inscripcionesFeature } from "./store/inscripciones.reducer";
import { InscripcionesRoutingModule } from "./inscripciones-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { InscripcionDialogComponent } from "./components/inscripcion-dialog/inscripcion-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { PipesModule } from "../../../../share/pipes/pipes.module";

@NgModule({
  declarations: [InscripcionesComponent, InscripcionDialogComponent],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects]),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    PipesModule,
  ],
  exports: [InscripcionesComponent],
})
export class InscripcionesModule {}
