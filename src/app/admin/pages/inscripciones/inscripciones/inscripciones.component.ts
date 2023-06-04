import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { InscripcionesService } from "./services/inscripciones.service";
import { InscripcionesActions } from "./store/inscripciones.actions";
import { Observable } from "rxjs";
import { State } from "./store/inscripciones.reducer";
import { selectInscripcionesState } from "./store/inscripciones.selectors";
import { MatDialog } from "@angular/material/dialog";
import { InscripcionDialogComponent } from "./components/inscripcion-dialog/inscripcion-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { Estudiante } from "../../listaestudiantes/listaestudiantes.component";

@Component({
  selector: "app-inscripciones",
  templateUrl: "./inscripciones.component.html",
  styleUrls: ["./inscripciones.component.scss"],
})
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource<Estudiante>();

  displayedColumns: string[] = ["estudiante", "curso", "delete"];
  state$: Observable<State>;

  constructor(
    private InscripcionesService: InscripcionesService,
    private store: Store,
    private matDialog: MatDialog
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripcioness());
  }
  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscription({ id }));
  }
  crearInscripcion(): void {
    this.matDialog.open(InscripcionDialogComponent);
  }
}
