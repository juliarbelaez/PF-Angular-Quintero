import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject, map } from "rxjs";
import { Estudiante } from "../listaestudiantes.component";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EstudianteService {
  private estudiantes$ = new BehaviorSubject<Estudiante[]>([
    {
      id: 1036402631,
      nombre: "Juliana",
      apellido: "Quintero",
      curso: "Inglés C1",
      email: "juliana@gmail.com",
      fecharegistro: new Date("2022-04-20"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1039453161,
      nombre: "Alejandro",
      apellido: "Calderón",
      curso: "Inglés B2",
      email: "alejandro@gmail.com",
      fecharegistro: new Date("2021-01-20"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1040887368,
      nombre: "Gabriel",
      apellido: "Calderón",
      curso: "Inglés A1",
      email: "gabriel@gmail.com",
      fecharegistro: new Date("2019-08-13"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 43467507,
      nombre: "Alejandra",
      apellido: "Martínez",
      curso: "Inglés A1",
      email: "alejandra@gmail.com",
      fecharegistro: new Date("2015-12-07"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 98736462,
      nombre: "Claudia",
      apellido: "Zapata",
      curso: "Inglés A2",
      email: "claudia@gmail.com",
      fecharegistro: new Date("2016-05-07"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 7654397,
      nombre: "Emiliana",
      apellido: "García",
      curso: "Francés A1",
      email: "emiliana@gmail.com",
      fecharegistro: new Date("2023-01-07"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1035628744,
      nombre: "Juan",
      apellido: "Valdez",
      curso: "Inglés B2",
      email: "juan@gmail.com",
      fecharegistro: new Date("2018-03-21"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1036402631,
      nombre: "Andrés",
      apellido: "Quintero",
      curso: "Inglés C1",
      email: "andres@gmail.com",
      fecharegistro: new Date("2018-03-21"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1039453161,
      nombre: "Andrea",
      apellido: "Zapata",
      curso: "Inglés B2",
      email: "andrea@gmail.com",
      fecharegistro: new Date("2022-04-21"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1040887368,
      nombre: "Samantha",
      apellido: "Ramirez",
      curso: "Inglés A2",
      email: "samanthal@gmail.com",
      fecharegistro: new Date("2021-06-20"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 43467507,
      nombre: "Kim",
      apellido: "Martínez",
      curso: "Inglés B1",
      email: "kim@gmail.com",
      fecharegistro: new Date("2020-03-20"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 98736462,
      nombre: "Claudia",
      apellido: "Garcia",
      curso: "Inglés A2",
      email: "claudia@gmail.com",
      fecharegistro: new Date("2023-03-20"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 7654397,
      nombre: "Esteban",
      apellido: "Arbeláez",
      curso: "Francés A1",
      email: "esteban@gmail.com",
      fecharegistro: new Date("2021-04-11"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
    {
      id: 1035628744,
      nombre: "Jorge",
      apellido: "Valdez",
      curso: "Inglés B2",
      email: "jorge@gmail.com",
      fecharegistro: new Date("2018-05-11"),
      role: "student",
      token: "QFKHNFertyuifghnjmfdskSkj12dk",
      password: "12345678",
    },
  ]);

  constructor(private httpClient: HttpClient) {}

  getEstudiantesFromDB(): Observable<Estudiante[]> {
    return this.httpClient.get<Estudiante[]>(`http://localhost:3000/students`);
  }

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.estudiantes$.asObservable();
  }
  obtenerEstudiantesporId(id: number): Observable<Estudiante | undefined> {
    return this.estudiantes$
      .asObservable()
      .pipe(
        map((estudiantes) =>
          estudiantes.find((estudiante) => estudiante.id === id)
        )
      );
  }
}
