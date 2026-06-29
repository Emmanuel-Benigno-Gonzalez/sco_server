import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript'
import Usuario  from './Usuario.model'
import { AuditChanges, AuditAction } from '../types/audit.types';
    
@Table({
    tableName: 'auditoria',
    timestamps: true,
    createdAt: 'fecha',
    updatedAt: false,
    indexes: [
        {
            fields: ['id_usuario']
        },
        {
            fields: ['tabla_afectada', 'id_registro']
        },
        {
            fields: ['fecha']
        }
    ]
})

class Auditoria extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    declare id_audi: number;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare id_usuario: number;

    declare fecha: Date;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare tabla_afectada: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare id_registro: string

    @Column({
        type: DataType.ENUM("CREATE", "UPDATE", "DELETE"),
        allowNull: false
    })
    declare action: AuditAction;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    declare cambios?: AuditChanges;

    @Column({
        type: DataType.STRING(45),
        allowNull: true
    })
    declare ip?: string;

    @BelongsTo(() => Usuario)
    declare usuario: Usuario;

}

export default Auditoria;