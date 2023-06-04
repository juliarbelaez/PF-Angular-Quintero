import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CursosService } from "../../services/cursos.service";
import { Curso } from "../../models";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-cursos-detalle",
  templateUrl: "./cursos-detalle.component.html",
  styleUrls: ["./cursos-detalle.component.scss"],
})
export class CursosDetalleComponent {
  curso: Curso | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosServices: CursosService, 
  ) {
    console.log(this.activatedRoute.snapshot.params);
    this.cursosServices
      .getCursoById(parseInt(this.activatedRoute.snapshot.params["id"]))
      .subscribe((curso) => (this.curso = curso));
  }
}
