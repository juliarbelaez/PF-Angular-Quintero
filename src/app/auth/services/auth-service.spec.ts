import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthServiceService, LoginFormValue } from './auth-service.service';
import { Estudiante } from 'src/app/admin/pages/listaestudiantes/listaestudiantes.component';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('Pruebas sobre AuthService', () => {
  let service: AuthServiceService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    }).compileComponents();

    service = TestBed.inject(AuthServiceService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El login debe funcionar', (done) => {
    const loginFake: LoginFormValue = {
      email: 'test@mail.com',
      password: '12345678',
    };
    const MOCK_REQUEST_RESULT: Estudiante[] = [
      {
        id: 123456790,
        nombre: 'testnombre;',
        apellido: 'testapellido',
        curso: 'Inglés A2',
        email: loginFake.email,
        password: loginFake.password,
        fecharegistro: new Date(),
        role: 'admin',
        token: 'fcasvhydrujILJIOJElkj295',
      },
    ];
    spyOn(TestBed.inject(Router), 'navigate');
    service
      .obtenerUsuarioAutenticado()
      .pipe(skip(1))
      .subscribe((usuario) => {
        expect(usuario).toEqual(MOCK_REQUEST_RESULT[0]);
        done();
      });
    service.login(loginFake);
    httpController
      .expectOne({
        url: `http://localhost:3000/usuarios?email=${loginFake.email}&password=${loginFake.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);
  });
  it('El logout debe emitir un authUser null, remover el token del Localstorage y redireccionar al usuario', () => {
    const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigateByUrl');
    const loginFake: LoginFormValue = {
      email: 'test@mail.com',
      password: '123456',
    };
    const MOCK_REQUEST_RESULT: Estudiante[] = [
      {
        id: 123456790,
        nombre: 'testnombre;',
        apellido: 'testapellido',
        curso: 'Inglés A2',
        email: loginFake.email,
        password: loginFake.password,
        fecharegistro: new Date(),
        role: 'admin',
        token: 'fcasvhydrujILJIOJElkj295',
      },
    ];

    service.login(loginFake);
    httpController
      .expectOne({
        url: `http://localhost:3000/usuarios?email=${loginFake.email}&password=${loginFake.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);

    service.logOut();

    const tokenLs = localStorage.getItem('token');

    expect(tokenLs).toBeNull();
    expect(spyOnNavigate).toHaveBeenCalled();
  });
});
