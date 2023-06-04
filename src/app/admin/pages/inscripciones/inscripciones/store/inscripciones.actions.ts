import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { InscriptionWithAll, CreateInscripcionData } from "../models/index";

export const InscripcionesActions = createActionGroup({
  source: "Inscripciones",
  events: {
    "Load Inscripcioness": emptyProps(),
    "Load Inscripcioness Success": props<{ data: InscriptionWithAll[] }>(),
    "Load Inscripcioness Failure": props<{ error: unknown }>(),
    "Delete Inscription": props<{ id: number }>(),
    "Delete Inscription Success": props<{ data: number }>(),
    "Delete Inscription Failure": props<{ error: unknown }>(),
    "Create Inscripcion": props<{ data: CreateInscripcionData }>(),
    "Create Inscripcion Success": props<{ data: InscriptionWithAll }>(),
    "Create Inscripcion Failure": props<{ error: unknown }>(),
  },
});
