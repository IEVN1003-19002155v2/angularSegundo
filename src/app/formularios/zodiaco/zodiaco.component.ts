import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  zodiacForm: FormGroup;
  showResults: boolean = false;
  nombre!: string;
  apaterno!: string;
  amaterno!: string;
  edad!: number;
  signoZodiacal!: string;
  imagenSigno!: string;

  constructor(private fb: FormBuilder) {
    this.zodiacForm = this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: ['']
    });
  }

  onSubmit(): void {
    const { nombre, apaterno, amaterno, dia, mes, anio } = this.zodiacForm.value;
    this.nombre = nombre;
    this.apaterno = apaterno;
    this.amaterno = amaterno;

    const fechaNacimiento = new Date(anio, mes - 1, dia);
    this.edad = this.calEdad(fechaNacimiento);

    this.signoZodiacal = this.obtenerSignoChino(anio);
    this.imagenSigno = this.getSignoImagen(this.signoZodiacal);
    
    this.showResults = true;
  }

  calEdad(fechaNacimiento: Date): number {
    const diff = Date.now() - fechaNacimiento.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  obtenerSignoChino(anio: number): string {
    const signosChinos = [
      'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente',
      'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];
    return signosChinos[(anio - 4) % 12]; // El ciclo del zodiaco chino comienza en el año 4 a.C.
  }

  getSignoImagen(signo: string): string {
    const signos: { [key: string]: string } = {
      'Rata': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgvu0mENA3H71tXPab8EV_aAspHjp0aVJHWw&s',
      'Buey': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg',
      'Tigre': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg',
      'Conejo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg',
      'Dragón': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg',
      'Serpiente': 'https://peopleenespanol.com/thmb/Who-b06dJwjtqnuJ406zgMaq4kg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165965553-2000-e4700b87c9fd404681a502f7095c2ac5.jpg',
      'Caballo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6hmy9IAr0B_OzFO6LmPha53qdvbCHZuLbQA&s',
      'Cabra': 'https://peopleenespanol.com/thmb/Fwy99mIonHJYbhmA9AOTeWCpkdU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165967741-2000-12afb4d370f14afe856f05ba36fe1693.jpg',
      'Mono': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg',
      'Gallo': 'https://peopleenespanol.com/thmb/Th2wLXhS9Tzh3VR7DtVB9CwgUFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165926089-2000-25a52aba2d0942679de98ba836f1ab9f.jpg',
      'Perro': 'https://studycli.org/wp-content/uploads/2021/06/chinese-new-year-year-of-the-dog-paper-cutting.jpeg',
      'Cerdo': 'https://peopleenespanol.com/thmb/3_4ezJWMT8DtQSEuV5vMg3X8DUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165969332-2000-eea5e27d3f4145c9b01121f4c61ccaef.jpg',
      'Desconocido': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qs6eniTkERD9VSeAmMtbqx_veEJSOW9lfw&s'
    };
    return signos[signo] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qs6eniTkERD9VSeAmMtbqx_veEJSOW9lfw&s';
  }
}
