import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlError',
})
export class ControlErrorPipe implements PipeTransform {
  transform(error: any, ...args: unknown[]): unknown {
    console.log(error);
    const opciones: Record<string, string> = {
      required: 'Este campo es requerido',
      minlength: `Este campo debe tener al menos ${error.value.requiredLength} caracteres`,
      email: 'El valor debe ser un email válido',
    };
    return opciones[error.key];
  }
}
