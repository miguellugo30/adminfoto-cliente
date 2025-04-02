export interface Cliente {
  numero_departamento: string,
  numero_referencia: string,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  correo_electronico: string
}

export interface Recibo {
  id: number,
  clave_recibo: string,
  unidad: string,
  condominio: string,
  numero_departamento: string,
  condomino: string,
  calle: string,
  numero_exterior: number,
  numero_interior: number,
  colonia: string,
  delegacion: string,
  cp: number,
  telefono: null,
  fecha_recibo: Date,
  fecha_lectura_anterior: Date,
  lectura_anterior: number,
  fecha_lectura_actual: Date,
  lectura_actual: number,
  fecha_limite_pago: Date,
  precio_litro: number,
  importe: number,
  gasto_admin: number,
  adeudo_anterior: number,
  cargos_adicionales: number,
  total_pagar: number,
  referencia: string,
  motivo_cancelacion: string,
  activo: number,
  admigas_departamentos_id: number,
  admigas_condominios_id: number,
  created_at: Date,
  updated_at: Date
}

export interface responseCliente {
  success: boolean;
  data: {
    cliente: Cliente[];
    recibo: Recibo[];
  }
}
