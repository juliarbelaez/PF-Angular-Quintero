import { createAction, props } from "@ngrx/store";
import { Estudiante } from "../../admin/pages/listaestudiantes/listaestudiantes.component";

export const ESTABLECER_USUARIO_AUTENTICADO = createAction(
  "[auth] Establecer usuario",
  props<{ payload: Estudiante & { token: string } }>()
);

export const ELIMINAR_USUARIO_AUTENTICADO = createAction(
  "[auth] Eliminar usuario"
);
