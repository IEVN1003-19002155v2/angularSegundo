import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resistencia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencia2.component.html',
  styleUrl: './resistencia2.component.css'
})
export default class Resistencia2Component {
  colors: string[] = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  colorCodes: { [key: string]: string } = {
    'Negro': 'black',
    'Café': '#8B4513',
    'Rojo': 'red',
    'Naranja': 'orange',
    'Amarillo': 'yellow',
    'Verde': 'green',
    'Azul': 'blue',
    'Violeta': 'violet',
    'Gris': 'gray',
    'Blanco': 'white'
  };

  resistenciaForm: FormGroup;
  resistencias: any[] = [];
  mostrarValoresCompletos = false;

  constructor(private fb: FormBuilder) {
    this.resistenciaForm = this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      tolerancia: ['', Validators.required]
    });

    this.cargarResistencias();
  }

  registrar() {
    const nuevaResistencia = {
      color1: this.resistenciaForm.value.color1,
      color2: this.resistenciaForm.value.color2,
      color3: this.resistenciaForm.value.color3,
      tolerancia: this.resistenciaForm.value.tolerancia,
      valor: 0,
      valorMax: 0,
      valorMin: 0
    };

    // Guardar en localStorage
    this.resistencias.push(nuevaResistencia);
    localStorage.setItem('resistencias', JSON.stringify(this.resistencias));

    // Resetear el formulario
    this.resistenciaForm.reset();
  }

  cargarResistencias() {
    const resistenciasGuardadas = localStorage.getItem('resistencias');
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
    }
  }

  imprimir() {
    this.mostrarValoresCompletos = true;

    // Recuperar resistencias y calcular los valores
    this.resistencias.forEach((resistencia) => {
      const valorColor1 = this.colors.indexOf(resistencia.color1);
      const valorColor2 = this.colors.indexOf(resistencia.color2);
      const multiplicador = Math.pow(10, this.colors.indexOf(resistencia.color3));
      const toleranceFactor = resistencia.tolerancia === 'oro' ? 0.05 : 0.10;

      resistencia.valor = (valorColor1 * 10 + valorColor2) * multiplicador;
      resistencia.valorMax = resistencia.valor * (1 + toleranceFactor);
      resistencia.valorMin = resistencia.valor * (1 - toleranceFactor);
    });
  }

  getColorCode(color: string): string {
    return this.colorCodes[color] || 'transparent';
  }

  getToleranceColor(tolerancia: string): string {
    return tolerancia === 'oro' ? 'gold' : 'silver';
  }
}
