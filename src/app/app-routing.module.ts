import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { LoginGuard } from "./auth/guards/login.guard";
import { ListaestudiantesComponent } from "./admin/pages/listaestudiantes/listaestudiantes.component";
import { RoleGuard } from "./auth/guards/role.guard";
import { EstudianteDetalleComponent } from "./pages/listaestudiantes/pages/estudiante-detalle/estudiante-detalle.component";

const routes: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: AdminComponent,
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "auth",
    canActivate: [LoginGuard],
    component: AuthComponent,
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    redirectTo: "dashboard/homepage",
  },
  {
    path: "cursos/editar/:id",
    component: EstudianteDetalleComponent,
    canActivate: [RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
