import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable()
export class AdminUserGuard implements CanActivate {
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
        if (estudianteAutenticado?.role !== "user") {
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
