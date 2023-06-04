import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { InscripcionesComponent } from "./inscripciones.component";
import { RoleGuard } from "src/app/auth/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: InscripcionesComponent,
    canActivate: [RoleGuard],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
