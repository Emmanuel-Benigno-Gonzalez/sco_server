export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

export interface ChangeDetail {
    oldValue: JsonValue;
    newValue: JsonValue;
}

export type AuditChanges = Record<string, ChangeDetail>;

export type AuditAction =
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE';