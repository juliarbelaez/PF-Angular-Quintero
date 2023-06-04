import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginFormValue } from '../services/auth-service.service';
import { Estudiante } from 'src/app/admin/pages/listaestudiantes/listaestudiantes.component';

export const ESTUDIANTEMOCK: Estudiante = {
  id: 1,
  apellido: 'testapellido',
  email: 'test@mail.com',
  nombre: 'testnombre',
  role: 'admin',
  token: 'asdkjsanfkdams3u2hjdasfadsuh',
  curso: 'Inglés A1',
  fecharegistro: new Date(),
  password: '12345678',
};

export class AuthServiceMock {
  private authUser$ = new BehaviorSubject<Estudiante | null>(null);

  login(formValue: LoginFormValue): void {
    this.authUser$.next(ESTUDIANTEMOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}
