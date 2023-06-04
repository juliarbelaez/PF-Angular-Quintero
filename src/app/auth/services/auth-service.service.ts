import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Subject,
  Observable,
  map,
  catchError,
  throwError,
  of,
} from "rxjs";
import { Estudiante } from "src/app/admin/pages/listaestudiantes/listaestudiantes.component";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/index";
import {
  ELIMINAR_USUARIO_AUTENTICADO,
  ESTABLECER_USUARIO_AUTENTICADO,
} from "src/app/store/auth/auth.actions";
import { selectAuthUser } from "../../store/auth/auth.selectors";

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  //private authUser$ = new BehaviorSubject<Estudiante | null>(null);
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  obtenerUsuarioAutenticado(): Observable<Estudiante | null> {
    return this.store.select(selectAuthUser);
  }
  establecerUsuarioAutenticado(usuario: Estudiante, token: string): void {
    this.store.dispatch(
      ESTABLECER_USUARIO_AUTENTICADO({ payload: { ...usuario, token } })
    );
  }

  login(formValue: LoginFormValue): void {
    this.httpClient
      .get<Estudiante[]>(
        `http://localhost:3000/users?email=${formValue.email}&password=${formValue.password}`
      )
      .subscribe({
        next: (estudiantes) => {
          const usuarioAutenticado = estudiantes[0];
          if (usuarioAutenticado) {
            localStorage.setItem("token", usuarioAutenticado.token);
            this.establecerUsuarioAutenticado(
              usuarioAutenticado,
              usuarioAutenticado.token
            );
            this.router.navigate(["admin"]);
          } else {
            this.snackBar.open("¡Usuario y contraseña incorrectos!", "Cerrar", {
              duration: 3000,
            });
          }
        },
      });
  }

  logOut(): void {
    localStorage.removeItem("token");
    this.store.dispatch(ELIMINAR_USUARIO_AUTENTICADO());
    this.router.navigateByUrl("/auth/login");
  }
  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem("token");
    return this.httpClient
      .get<Estudiante[]>(`http://localhost:3000/users?token=${token}`, {
        headers: new HttpHeaders({
          Authorization: token || "",
        }),
      })
      .pipe(
        map((estudiantes) => {
          const estudianteAutenticado = estudiantes[0];
          if (estudianteAutenticado) {
            localStorage.setItem("token", estudianteAutenticado.token);
            this.establecerUsuarioAutenticado(
              estudianteAutenticado,
              estudianteAutenticado.token
            );
          }
          return !!estudianteAutenticado;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }
}
