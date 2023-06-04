import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable, takeUntil } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.obtenerUsuarioAutenticado().pipe(
      map((estudianteAutenticado) => {
        if (estudianteAutenticado?.role !== "admin") {
          this.snackBar.open(
            "No tienes permisos para ingresar a este modulo",
            "Cerrar",
            {
              duration: 5000,
            }
          );
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
