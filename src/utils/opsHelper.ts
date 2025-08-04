import Operacion from '../models/Operacion.model';

function calcularTotales(op: Operacion) {
  const total_nac = (op.adulto_nac || 0)
    + (op.infante_nac || 0)
    + (op.transito_nac || 0)
    + (op.conexion_nac || 0)
    + (op.excento_nac || 0);

  const total_int = (op.adulto_int || 0)
    + (op.infante_int || 0)
    + (op.transito_int || 0)
    + (op.conexion_int || 0)
    + (op.excento_int || 0);

  const total_pax = total_nac + total_int;

  op.setDataValue('total_nac', total_nac);
  op.setDataValue('total_int', total_int);
  op.setDataValue('total_pax', total_pax);
}

function calcularRutaOD(op: Operacion) {
  const iata = op.iata_aeropuerto;
  const tipo = op.tipo_mov;

  let origen = 'TLC';
  let destino = 'TLC';

  if (iata === 'TLC') {
    // Ambos TLC
  } else if (tipo === 'S') {
    destino = iata;
  } else {
    origen = iata;
  }

  op.setDataValue('origen', origen);
  op.setDataValue('destino', destino);
}

export function procesarOperaciones(operaciones: Operacion[]): Operacion[] {
  return operaciones.map(op => {
    calcularTotales(op);
    calcularRutaOD(op);
    return op;
  });
}