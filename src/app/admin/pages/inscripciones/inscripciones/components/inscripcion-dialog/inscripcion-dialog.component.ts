import { Component, OnDestroy, OnInit } from "@angular/core";
import { EstudianteService } from "src/app/admin/pages/listaestudiantes/services/estudiante.service";
import { Estudiante } from "../../../../listaestudiantes/listaestudiantes.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CursosService } from "src/app/admin/pages/cursos/services/cursos.service";
import { Curso, SubjectCourse } from "src/app/admin/pages/cursos/models";
import { Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { InscripcionesActions } from "../../store/inscripciones.actions";
import { CreateInscripcionData } from "../../models/index";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-inscripcion-dialog",
  templateUrl: "./inscripcion-dialog.component.html",
  styleUrls: ["./inscripcion-dialog.component.scss"],
})
export class InscripcionDialogComponent implements OnInit, OnDestroy {
  estudiantes: Estudiante[] = [];
  cursos: SubjectCourse[] = [];

  selectedCourseControl = new FormControl<Curso | null>(null);

  studentIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  subjectIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  courseIdControl = new FormControl<number | null>(null, [Validators.required]);

  inscriptionForm = new FormGroup({
    subjectId: this.subjectIdControl,
    studentId: this.studentIdControl,
    courseId: this.courseIdControl,
  });

  destroyed$ = new Subject<void>();

  constructor(
    private estudianteService: EstudianteService,
    private cursosService: CursosService,
    private store: Store,
    private dialogRef: MatDialogRef<InscripcionDialogComponent>
  ) {
    this.selectedCourseControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.subjectIdControl.setValue(curso.subjectId);
            this.courseIdControl.setValue(curso.id);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit(): void {
    this.estudianteService.getEstudiantesFromDB().subscribe({
      next: (res) => {
        this.estudiantes = res;
      },
    });
    this.cursosService.obtenerCursosWithSubject().subscribe({
      next: (res) => {
        this.cursos = res;
      },
    });
  }
  onSave(): void {
    this.store.dispatch(
      InscripcionesActions.createInscripcion({
        data: this.inscriptionForm.value as CreateInscripcionData,
      })
    );
    this.dialogRef.close();
  }
}
