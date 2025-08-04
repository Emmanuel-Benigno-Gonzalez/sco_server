import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    BeforeUpdate 
} from 'sequelize-typescript'
import Usuario  from './Usuario.model'
import Matricula from './Matricula.model'
import Aeropuerto from './Aeropuerto.model'
import Compania from './Compania.model'
import Calificador from './Calificador.model'
import { Op } from 'sequelize';

@Table({
    tableName: 'operacion'
})

class Operacion extends Model {

    @PrimaryKey
    @Column(DataType.STRING(13))
    declare id_ops: string;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_usuario: number;

    @ForeignKey(() => Matricula)
    @Column({
        type: DataType.STRING(10),
        allowNull: false
    })
    declare id_matricula: string

    @Column({
        type: DataType.STRING(1),
        allowNull: false
    })
    declare tipo_mov: string

    @ForeignKey(() => Aeropuerto)
    @Column({
        type: DataType.STRING(4),
        allowNull: false
    })
    declare iata_aeropuerto: string

    @Column({
        type: DataType.DATE(),
        allowNull: false
    })
    declare fecha_iniOps: Date

    @Column({
        type: DataType.DATE()
    })
    declare fecha_finOps: Date

    @Column({
        type: DataType.TIME(),
        allowNull: false
    })
    declare hora_iti: string

    @Column({
        type: DataType.TIME(),
        allowNull: false
    })
    declare hora_real: string

    @Column({
        type: DataType.TIME(),
    })
    declare hora_calzos: string

    @Column({
        type: DataType.TIME(),
    })
    declare hora_finOps: string

    @ForeignKey(() => Compania)
    @Column({
        type: DataType.STRING(5),
        allowNull: false
    })
    declare id_compania: string

    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    declare vuelo: string

    @Column({
        type: DataType.STRING(10),
        allowNull: false
    })
    declare pista: string

    @ForeignKey(() => Calificador)
    @Column({
        type: DataType.STRING(5),
        allowNull: false
    })
    declare id_calificador: string

    @Column({
        type: DataType.STRING(10)
    })
    declare posicion: string

    @Column({
        type: DataType.INTEGER()
    })
    declare puerta: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare banda: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare adulto_nac: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare infante_nac: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare transito_nac: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare conexion_nac: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare excento_nac: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare adulto_int: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare infante_int: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare transito_int: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare conexion_int: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare excento_int: number;

    @Column({
        type: DataType.INTEGER()
    })
    declare pza_equipaje: number;

    @Column({
        type: DataType.FLOAT()
    })
    declare kgs_equipaje: number;

    @Column({
        type: DataType.FLOAT()
    })
    declare kgs_carga: number;

    @Column({
        type: DataType.STRING(100)
    })
    declare correo: string

    @Column({
        type: DataType.STRING(255)
    })
    declare observaciones: string

    @BelongsTo(() => Usuario)
    declare usuario: Usuario;

    @BelongsTo(() => Matricula)
    declare matricula: Matricula;

    @BelongsTo(() => Aeropuerto)
    declare aeropuerto: Aeropuerto;

    @BelongsTo(() => Compania)
    declare compania: Compania;

    @BelongsTo(() => Calificador)
    declare calificador: Calificador;

    @BeforeCreate
    static async generateIdOps(instance: Operacion) {
        const fecha = new Date()
        const fechaStr = fecha.toISOString().slice(0, 10).replace(/-/g, '');

        const ultimo = await Operacion.findOne({
        where: {
            id_ops: {
                [Op.like]: `${fechaStr}%`,
            }
        },
        order: [['id_ops', 'DESC']],
        attributes: ['id_ops']
        });

        let nuevoConsecutivo = '0001';
        if (ultimo?.id_ops) {
            const ultNum = parseInt(ultimo.id_ops.slice(8));
            nuevoConsecutivo = String(ultNum + 1).padStart(4, '0')
        }

        instance.id_ops = `${fechaStr}${nuevoConsecutivo}`
    }

    @BeforeCreate
    static async setDefaults(instance: Operacion) {
        const addMinutes = (time: string, minutes: number): string => {
            const [h, m, s] = time.split(':').map(Number);
            const date = new Date(0, 0, 0, h, m, s || 0);
            date.setMinutes(date.getMinutes() + minutes);
            return date.toTimeString().slice(0, 8);
        };

        // Hora_Calzos = Hora_Real + 5 min
        if (!instance.hora_calzos && instance.hora_real) {
            instance.hora_calzos = addMinutes(instance.hora_real, 5);
        }

        // hora_finOps = hora_calzos + 5 min
        if (!instance.hora_finOps && instance.hora_calzos) {
            instance.hora_finOps = addMinutes(instance.hora_calzos, 5);
        }

        // fecha_finOps = fecha_iniOps si no se especifica
        if (!instance.fecha_finOps && instance.fecha_iniOps) {
            instance.fecha_finOps = instance.fecha_iniOps;
        }

        // Campos string a ''
        instance.posicion = instance.posicion ?? '';
        instance.correo = instance.correo ?? '';
        instance.observaciones = instance.observaciones ?? '';

        // Campos numéricos a 0
        const numFields = [
            'puerta', 'banda', 'adulto_nac', 'infante_nac', 'transito_nac',
            'conexion_nac', 'excento_nac', 'adulto_int', 'infante_int',
            'transito_int', 'conexion_int', 'excento_int', 'pza_equipaje',
            'kgs_equipaje', 'kgs_carga'
        ];

        for (const field of numFields) {
            if ((instance as any)[field] == null) {
                (instance as any)[field] = 0;
            }
        }
    }

    static validarHoras(instance: Operacion) {
        const parseTime = (t: string) => {
            const [h, m, s] = t.split(':').map(Number);
            return h * 3600 + m * 60 + (s || 0);
        };

        if (instance.hora_calzos && instance.hora_real) {
            const calzos = parseTime(instance.hora_calzos);
            const real = parseTime(instance.hora_real);
            if (calzos <= real) {
                throw new Error('Hora_Calzos debe ser mayor que Hora_Real');
            }
        }

        if (instance.hora_finOps && instance.hora_calzos) {
            const fin = parseTime(instance.hora_finOps);
            const calzos = parseTime(instance.hora_calzos);
            if (fin <= calzos) {
                throw new Error('Fin_OPS debe ser mayor que Hora_Calzos');
            }
        }
    }

    static validarFechas(instance: Operacion) {
        if (instance.fecha_finOps && instance.fecha_iniOps) {
            const fin = new Date(instance.fecha_finOps).getTime();
            const ini = new Date(instance.fecha_iniOps).getTime();
            if (fin < ini) {
                throw new Error('Fecha de Fin de Operacion debe ser mayor o igual que Fecha de Inicio de Operacion');
            }
        }
    }

    @BeforeCreate
    static async beforeCreateHook(instance: Operacion) {
        await Operacion.generateIdOps(instance);
        Operacion.setDefaults(instance);
        Operacion.validarHoras(instance);
        Operacion.validarFechas(instance);   
    }

    @BeforeUpdate
    static beforeUpdateHook(instance: Operacion) {
        Operacion.setDefaults(instance);
        this.validarHoras(instance);
        Operacion.validarFechas(instance);
    }

}

export default Operacion

