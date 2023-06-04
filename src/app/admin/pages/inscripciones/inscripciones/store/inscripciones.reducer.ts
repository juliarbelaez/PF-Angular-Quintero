import { createFeature, createReducer, on } from "@ngrx/store";
import { InscripcionesActions } from "./inscripciones.actions";
import { InscriptionWithAll } from "../models/index";

export const inscripcionesFeatureKey = "inscripciones";

export interface State {
  loading: boolean;
  inscripciones: InscriptionWithAll[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  inscripciones: [],
  error: null,
};

export const reducer = createReducer<State>(
  initialState,
  on(InscripcionesActions.loadInscripcioness, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(InscripcionesActions.loadInscripcionessSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      inscripciones: action.data,
    };
  }),

  on(InscripcionesActions.loadInscripcionessFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(InscripcionesActions.deleteInscription, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscripcionesActions.deleteInscriptionSuccess, (state, action) => {
    return {
      ...state,
      inscripciones: state.inscripciones.filter((i) => i.id !== action.data),
      loading: false,
    };
  }),

  on(InscripcionesActions.deleteInscriptionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(InscripcionesActions.createInscripcion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscripcionesActions.createInscripcionSuccess, (state, action) => {
    const newInscripcion = action.data;
    return {
      ...state,
      loading: false,
      inscripciones: [...state.inscripciones, newInscripcion],
    };
  }),
  on(InscripcionesActions.createInscripcionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});
