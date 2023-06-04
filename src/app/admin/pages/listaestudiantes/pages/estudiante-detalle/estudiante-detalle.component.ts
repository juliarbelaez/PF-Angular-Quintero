import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../listaestudiantes.component';

@Component({
  selector: 'app-estudiante-detalle',
  templateUrl: './estudiante-detalle.component.html',
  styleUrls: ['./estudiante-detalle.component.scss'],
})
export class EstudianteDetalleComponent {
  estudiante: Estudiante | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private estudianteService: EstudianteService
  ) {
    console.log(this.activatedRoute.snapshot.params);
    this.estudianteService
      .obtenerEstudiantesporId(
        parseInt(this.activatedRoute.snapshot.params['id'])
      )
      .subscribe((estudiante) => (this.estudiante = estudiante));
  }
}
