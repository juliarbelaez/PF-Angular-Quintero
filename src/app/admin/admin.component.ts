import { Component } from '@angular/core';
import { Router } from '@angular/router';
import links from './nav-items';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { Observable } from 'rxjs';
import { Estudiante } from './pages/listaestudiantes/listaestudiantes.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  showFiller = false;
  links = links;
  authUser$: Observable<Estudiante | null>;

  constructor(private router: Router, private authService: AuthServiceService) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
  }
  logOut(): void {
    this.authService.logOut();
  }
  redirectToHome() {
    this.router.navigate(['/dashboard', 'homepage']);
  }
}
