import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ListaestudiantesModule } from "./pages/listaestudiantes/listaestudiantes.module";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule, CanActivate } from "@angular/router";
import { CursosModule } from "./pages/cursos/cursos.module";
import { MatListModule } from "@angular/material/list";
import { HomepageComponent } from "../homepage/homepage.component";
import { ListaestudiantesComponent } from "./pages/listaestudiantes/listaestudiantes.component";
import { EstudianteDetalleComponent } from "./pages/listaestudiantes/pages/estudiante-detalle/estudiante-detalle.component";
import { CursosComponent } from "./pages/cursos/cursos.component";
import { CursosDetalleComponent } from "./pages/cursos/components/cursos-detalle/cursos-detalle.component";
import { InscripcionesComponent } from "./pages/inscripciones/inscripciones/inscripciones.component";
import { RoleGuard } from "../auth/guards/role.guard";
import { AdminUserGuard } from "../auth/guards/admin.guard";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDividerModule,
    RouterModule,
    CursosModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: "homepage",
        component: HomepageComponent,
      },
      {
        path: "estudiantes",
        loadChildren: () =>
          import("./pages/listaestudiantes/listaestudiantes.module").then(
            (m) => m.ListaestudiantesModule
          ),
      },
      {
        path: "cursos",
        children: [
          {
            path: "",
            component: CursosComponent,
          },
          {
            path: ":id",
            component: CursosDetalleComponent,
            canActivate: [RoleGuard],
          },
        ],
      },
      {
        path: "inscripciones",
        loadChildren: () =>
          import(
            "./pages/inscripciones/inscripciones/inscripciones.module"
          ).then((m) => m.InscripcionesModule),
      },
    ]),
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
