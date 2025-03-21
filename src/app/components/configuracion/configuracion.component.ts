import { Component } from '@angular/core';

@Component({
    selector: 'app-configuracion',
    standalone: false,
    templateUrl: './configuracion.component.html',
    styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
    configuracion = {
        nombre: '',
        apellido: '',
        rangoMaximo: 4,
        numeroIntentos: 1
    };

    feedback = {
        nombre: '',
        apellido: '',
        rangoMaximo: '',
        numeroIntentos: '',
        mensajeBienvenida: '',
        intentosRestantes: 0,
        resultado: ''
    };

    numeroAleatorio: number | null = null;
    numeroIngresado: number | null = null;

    juegoIniciado = false;
    botonHabilitado = false;
    ultimoIntentoMensaje: string | null = null;

    onSubmit() {
        console.log('Datos de configuración:', this.configuracion);
        this.numeroAleatorio = Math.floor(Math.random() * this.configuracion.rangoMaximo);
        this.feedback.mensajeBienvenida = `Ongi Etorri ${this.configuracion.nombre} ${this.configuracion.apellido}`;
        this.feedback.intentosRestantes = this.configuracion.numeroIntentos;
        this.juegoIniciado = true;

        console.log('Número aleatorio generado:', this.numeroAleatorio);
    }

    validarFormulario() {
        this.feedback.nombre = this.configuracion.nombre.trim() === '' ? 'El nombre no puede estar vacío' : '✅';
        this.feedback.apellido = this.configuracion.apellido.trim() === '' ? 'El apellido no puede estar vacío' : '✅';
        this.feedback.rangoMaximo = this.configuracion.rangoMaximo < 4 ? 'El rango mínimo es 4' : '✅';
        this.feedback.numeroIntentos = this.configuracion.numeroIntentos <= 0 ? 'Debe ser mayor que 0' : '✅';

        this.botonHabilitado =
            this.configuracion.nombre.trim() !== '' &&
            this.configuracion.apellido.trim() !== '' &&
            this.configuracion.rangoMaximo >= 4 &&
            this.configuracion.numeroIntentos > 0;
    }

    verificarNumero() {
      if (this.numeroIngresado === null || this.numeroAleatorio === null) return;
  
      if (this.numeroIngresado > this.numeroAleatorio) {
          this.ultimoIntentoMensaje = 'Te pasaste';
      } else if (this.numeroIngresado === this.numeroAleatorio) {
          this.ultimoIntentoMensaje = '¡Has Ganado!';
          this.feedback.resultado = this.ultimoIntentoMensaje; 
          return;
      } else {
          const diferencia = this.numeroAleatorio - this.numeroIngresado;
          if (diferencia === 1) {
              this.ultimoIntentoMensaje = 'Caliente';
          } else if (diferencia === 2) {
              this.ultimoIntentoMensaje = 'Templado';
          } else {
              this.ultimoIntentoMensaje = 'Frío';
          }
      }
  
      this.feedback.intentosRestantes--;
  
      if (this.feedback.intentosRestantes <= 0) {
          this.feedback.resultado = this.ultimoIntentoMensaje + '. Te has quedado sin intentos. ¡Fin del juego!';
      } else {
          this.feedback.resultado = this.ultimoIntentoMensaje;
      }
    }

    obtenerColorResultado(): string {
        switch (this.feedback.resultado) {
            case 'Te pasaste': return 'black';
            case 'Caliente': return 'red';
            case 'Templado': return 'orange';
            case 'Frío': return 'blue';
            case '¡Has Ganado!': return 'green';
            default: return 'black';
        }
    }

    reiniciarJuego() {
      this.juegoIniciado = false;
      this.numeroAleatorio = null;
      this.numeroIngresado = null;
      this.feedback.resultado = '';
      this.feedback.intentosRestantes = 0;
      this.ultimoIntentoMensaje = null;
    }
}
