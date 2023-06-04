import { Component, OnInit } from "@angular/core";
import { CursosService } from "./services/cursos.service";
import { MatTableDataSource } from "@angular/material/table";
import { Curso } from "./models/index";
import { MatDialog } from "@angular/material/dialog";
import { DialogoformularioComponent } from "./components/dialogoformulario/dialogoformulario.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { RoleGuard } from "../../../auth/guards/role.guard";

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.component.html",
  styleUrls: ["./cursos.component.scss"],
})
export class CursosComponent {
  dataSource = new MatTableDataSource();
  constructor(
    private cursosService: CursosService,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
    this.cursosService.obtenerCursosWithSubject().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  abrirDialogoFormulario(): void {
    const dialog = this.matDialog.open(DialogoformularioComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.cursosService.crearCursos(formValue);
      }
    });
  }

  editarCurso(curso: Curso): void {
    const dialog = this.matDialog.open(DialogoformularioComponent, {
      data: {
        curso,
      },
    });
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.cursosService.editarCurso(curso.id, formValue);
      }
    });
  }

  irAlDetalle(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute,
    });
  }

  eliminarCurso(curso: Curso): void {
    const snackBarRef = this.snackBar.open(
      "¿Estás seguro de eliminar el curso?",
      "Eliminar",
      {
        duration: 5000,
        panelClass: "snackbar-danger",
      }
    );
    snackBarRef.onAction().subscribe(() => {
      this.cursosService.eliminarCurso(curso.id);
    });
  }
  displayedColumns: string[] = [
    "id",
    "nombreCurso",
    "fechaInicio",
    "fechaFin",
    "detail",
    "editar",
    "eliminar",
  ];
}
