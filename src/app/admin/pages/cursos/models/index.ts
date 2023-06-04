import { Subject } from "../../subject/models/index";
export interface Curso {
  id: number;
  subjectId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}

export interface SubjectCourse extends Curso {
  subject: Subject;
}

export interface CrearCursoPayload {
  subjectId: number;
  fecha_inicio: Date;
  fecha_fin: Date;
}
