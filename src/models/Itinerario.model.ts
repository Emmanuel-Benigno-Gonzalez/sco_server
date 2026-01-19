import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    BeforeUpdate, 
    AllowNull
} from 'sequelize-typescript'
import Usuario  from './Usuario.model'
import Matricula from './Matricula.model'
import Aeropuerto from './Aeropuerto.model'
import Compania from './Compania.model'
import Calificador from './Calificador.model'
import { Op } from 'sequelize';

@Table({
    tableName: 'itinerario-comercial'
})

class ItinerarioComercial extends Model {

    @PrimaryKey
    @Column(DataType.STRING(14))
    declare id_iti: string;

    @Column({
        type: DataType.STRING(2),
        allowNull: false
    })
    declare tipo_mov: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_usuario: number;

    @Column({
        type: DataType.STRING(10),
        allowNull: false
    })
    declare id_matricula: string
    
    @Column({
        type: DataType.STRING(4),
        allowNull: false
    })
    declare iata_aeropuerto: string
      
    @Column({
        type: DataType.DATE(),
        allowNull: false
    })
    declare fecha_iti: Date

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

    @BeforeCreate
    static async generateIdOps(instance: ItinerarioComercial) {
        const fecha = new Date();
        const fechaStr = fecha.toISOString().slice(0, 10).replace(/-/g, '');

        const ultimo = await ItinerarioComercial.findOne({
            where: {
                id_iti: {
                    [Op.like]: `${fechaStr}%`,
                }
            },
            order: [['id_iti', 'DESC']],
            attributes: ['id_iti']
        });

        let nuevoConsecutivo = '0001';
        if (ultimo?.id_iti) {
            const ultNum = parseInt(ultimo.id_iti.slice(9)); // ojo: slice(9) porque ahora el ID arranca con "I"
            nuevoConsecutivo = String(ultNum + 1).padStart(4, '0');
        }

        instance.id_iti = `I${fechaStr}${nuevoConsecutivo}`;
    }

    @BeforeCreate
    static async beforeCreateHook(instance: ItinerarioComercial) {
        if (
            instance.tipo_mov === "S" //&&
            //["RP", "FP", "RC", "FC"].includes(instance.id_calificador)
        ) {
            await ItinerarioComercial.generateIdOps(instance);
        }
    }
}

export default ItinerarioComercial