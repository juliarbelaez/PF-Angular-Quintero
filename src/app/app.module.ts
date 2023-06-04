import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminModule } from "./admin/admin.module";
import { MatDividerModule } from "@angular/material/divider";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { EstudianteDetalleComponent } from "./pages/listaestudiantes/pages/estudiante-detalle/estudiante-detalle.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { actionReducerMap } from "./store";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, EstudianteDetalleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
    MatDividerModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    MatDialogModule,
    StoreModule.forRoot(actionReducerMap, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
