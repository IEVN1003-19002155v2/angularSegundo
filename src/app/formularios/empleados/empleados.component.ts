import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styles: ``
})

export default class EmpleadosComponent implements OnInit {

  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  mostrarTabla: boolean = false;
  matriculaModificar: string | null = null;
  matriculaAccion: string = '';  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horasTrabajadas: ['']
    });

    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  onSubmit(): void {
    const nuevoEmpleado: Empleado = {
      matricula: this.formGroup.value.matricula,
      nombre: this.formGroup.value.nombre,
      correo: this.formGroup.value.correo,
      edad: this.formGroup.value.edad,
      horasTrabajadas: this.formGroup.value.horasTrabajadas
    };

    if (this.matriculaModificar) {
      this.empleados = this.empleados.map(emp =>
        emp.matricula === this.matriculaModificar ? nuevoEmpleado : emp
      );
      this.matriculaModificar = null;
    } else {
      this.empleados.push(nuevoEmpleado);
    }

    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.formGroup.reset();
  }

  calcularPago(empleado: Empleado): { subTotal: number, pagoHorasExtras: number, pagoHorasNormales: number } {
    const horasNormales = empleado.horasTrabajadas > 40 ? 40 : empleado.horasTrabajadas;
    const horasExtras = empleado.horasTrabajadas > 40 ? empleado.horasTrabajadas - 40 : 0;

    const pagoHorasNormales = horasNormales * 70;
    const pagoHorasExtras = horasExtras * 140;  
    const subTotal = pagoHorasNormales + pagoHorasExtras;

    return { subTotal, pagoHorasExtras, pagoHorasNormales };
  }

  calcularTotal(): number {
    return this.empleados.reduce((total, empleado) => total + this.calcularPago(empleado).subTotal, 0);
  }

  subImprime(): void {
    this.mostrarTabla = true;

    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  modificarMatricula(): void {
    const empleado = this.empleados.find(emp => emp.matricula === this.matriculaAccion);
    if (empleado) {
      this.formGroup.patchValue(empleado);
      this.matriculaModificar = this.matriculaAccion;
    }
  }

  eliminarMatricula(): void {
    this.empleados = this.empleados.filter(emp => emp.matricula !== this.matriculaAccion);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }
}
