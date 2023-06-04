import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { concatMap } from "rxjs/operators";
import {
  InscriptionWithAll,
  CreateInscripcionData,
  Inscripcion,
} from "../models/index";

@Injectable({
  providedIn: "root",
})
export class InscripcionesService {
  constructor(private httpClient: HttpClient) {}

  createInscripcion(
    data: CreateInscripcionData
  ): Observable<InscriptionWithAll> {
    return this.httpClient
      .post<InscriptionWithAll>(`http://localhost:3000/inscriptions`, data)
      .pipe(
        concatMap((createResponse) =>
          this.getInscriptionWithAll(createResponse.id)
        )
      );
  }

  getInscriptionWithAll(id: number): Observable<InscriptionWithAll> {
    return this.httpClient.get<InscriptionWithAll>(
      `http://localhost:3000/inscriptions/${id}?_expand=student&_expand=subject&_expand=course`
    );
  }

  getAllInscripciones(): Observable<InscriptionWithAll[]> {
    return this.httpClient.get<InscriptionWithAll[]>(
      `http://localhost:3000/inscriptions?_expand=course&_expand=student&_expand=subject`
    );
  }

  deleteInscripcionById(id: number): Observable<unknown> {
    return this.httpClient.delete(`http://localhost:3000/inscriptions/${id}`);
  }
  saveInscripcionesToLocalStorage(inscripciones: InscriptionWithAll[]): void {
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
  }

  getInscripcionesFromLocalStorage(): InscriptionWithAll[] {
    const inscripcionesString = localStorage.getItem("inscripciones");
    if (inscripcionesString) {
      return JSON.parse(inscripcionesString);
    }
    return [];
  }
}
