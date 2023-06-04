import { createReducer, on } from "@ngrx/store";
import { Estudiante } from "../../admin/pages/listaestudiantes/listaestudiantes.component";
import {
  ELIMINAR_USUARIO_AUTENTICADO,
  ESTABLECER_USUARIO_AUTENTICADO,
} from "./auth.actions";

export const authFeatureKey = "auth";

export interface AuthState {
  authUser: Estudiante | null;
  token: string | null;
}

const initialState: AuthState = {
  authUser: null,
  token: localStorage.getItem("token" || null),
};

export const authReducer = createReducer(
  initialState,

  on(ESTABLECER_USUARIO_AUTENTICADO, (currentState, { payload }) => {
    return {
      authUser: payload,
      token: payload.token,
    };
  }),
  on(ELIMINAR_USUARIO_AUTENTICADO, (currentState) => {
    return {
      authUser: null,
      token: null,
    };
  })
);
