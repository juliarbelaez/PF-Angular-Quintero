import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, concatMap } from "rxjs/operators";
import { Observable, EMPTY, of } from "rxjs";
import { InscripcionesActions } from "./inscripciones.actions";
import { InscripcionesService } from "../services/inscripciones.service";

@Injectable()
export class InscripcionesEffects {
  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.createInscripcion),
      concatMap((action) =>
        this.inscripcionesService.createInscripcion(action.data).pipe(
          map((res) =>
            InscripcionesActions.createInscripcionSuccess({ data: res })
          ),
          catchError((error) =>
            of(InscripcionesActions.createInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  loadInscripcioness$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripcioness),
      concatMap(() =>
        this.inscripcionesService.getAllInscripciones().pipe(
          map((data) =>
            InscripcionesActions.loadInscripcionessSuccess({ data })
          ),
          catchError((error) =>
            of(InscripcionesActions.loadInscripcionessFailure({ error }))
          )
        )
      )
    );
  });
  deleteInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscription),
      concatMap((action) =>
        this.inscripcionesService.deleteInscripcionById(action.id).pipe(
          map((data) =>
            InscripcionesActions.deleteInscriptionSuccess({ data: action.id })
          ),
          catchError((error) =>
            of(InscripcionesActions.deleteInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) {}
}
