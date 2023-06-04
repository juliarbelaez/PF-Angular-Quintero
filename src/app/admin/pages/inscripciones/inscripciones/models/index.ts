import { Estudiante } from "../../../listaestudiantes/listaestudiantes.component";
import { Subject } from "../../../subject/models/index";
import { Curso } from "../../../cursos/models/index";
export interface Inscripcion {
  id: number;
  studentId: number;
  courseId: number;
  subjectId: number;
}

export interface InscriptionWithStudent extends Inscripcion {
  student: Estudiante;
}
export interface InscriptionWithSubject extends Inscripcion {
  subject: Subject;
}
export interface InscriptionWithCourse extends Inscripcion {
  course: Curso;
}
export interface CreateInscripcionData {
  studentId: number;
  courseId: number;
  subjectId: number;
}
export type InscriptionWithAll = InscriptionWithStudent &
  InscriptionWithSubject &
  InscriptionWithCourse;
