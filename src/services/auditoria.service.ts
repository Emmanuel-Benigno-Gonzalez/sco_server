import Auditoria from '../models/Auditoria.model';
import {
    AuditAction,
    AuditChanges,
    JsonValue
} from '../types/audit.types';

interface RegistrarAuditoriaParams {
    id_usuario: number;
    tabla_afectada: string;
    id_registro: string;
    action: AuditAction;
    cambios?: AuditChanges;
    ip?: string;
}

export function obtenerCambios(
    anterior: Record<string, unknown>,
    nuevo: Record<string, unknown>
): AuditChanges {

    const cambios: AuditChanges = {};

    const camposIgnorados = [
        'createdAt',
        'updatedAt',
        'fecha'
    ];

    for (const key of Object.keys(nuevo)) {

        if (camposIgnorados.includes(key)) {
            continue;
        }

        if (anterior[key] !== nuevo[key]) {

            cambios[key] = {
                oldValue: (anterior[key] ?? null) as JsonValue,
                newValue: (nuevo[key] ?? null) as JsonValue
            };
        }
    }

    return cambios;
}

export async function registrarAuditoria(
    params: RegistrarAuditoriaParams
): Promise<void> {

    await Auditoria.create({
        id_usuario: params.id_usuario,
        tabla_afectada: params.tabla_afectada,
        id_registro: params.id_registro,
        action: params.action,
        cambios: params.cambios,
        ip: params.ip
    });
}