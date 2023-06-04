import { Injectable } from "@angular/core";
import { BehaviorSubject, mergeMap, Observable, take, tap } from "rxjs";
import { Curso } from "../models";
import { CrearCursoPayload, SubjectCourse } from "../models/index";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>([]);
  constructor(private httpClient: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(`http://localhost:3000/courses?_expand=subject`)
      .pipe(
        tap((cursos) => this.cursos$.next(cursos)),
        mergeMap(() => this.cursos$.asObservable())
      );
  }

  obtenerCursosWithSubject(): Observable<SubjectCourse[]> {
    return this.httpClient.get<SubjectCourse[]>(
      `http://localhost:3000/courses?_expand=subject`
    );
  }

  crearCursos(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        this.cursos$.next([
          ...cursos,
          {
            id: cursos.length + 1,
            ...payload,
          },
        ]);
      },
      complete: () => {},
      error: () => {},
    });
    return this.cursos$.asObservable();
  }
  editarCurso(
    course: number,
    actualizacion: Partial<Curso>
  ): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.map((curso) => {
          if (curso.id === course) {
            return {
              ...curso,
              ...actualizacion,
            };
          } else {
            return curso;
          }
        });

        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.cursos$.asObservable();
  }
  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.filter(
          (curso) => curso.id !== cursoId
        );
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.cursos$.asObservable();
  }

  getCursoById(cursoId: number): Observable<Curso | undefined> {
    return this.cursos$
      .asObservable()
      .pipe(map((cursos) => cursos.find((c) => c.id === cursoId)));
  }
}
