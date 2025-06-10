import { Table, 
    Column, 
    DataType, 
    Model, 
    PrimaryKey, 
    ForeignKey, 
    BelongsTo 
} from 'sequelize-typescript'
import Aeronave from './Aeronave.model'
import Calificador from './Calificador.model'
import Compania from './Compania.model'

@Table({
    tableName: 'matricula'
})

class Matricula extends Model {

    @PrimaryKey
    @Column({
        type: DataType.STRING(10)
    })
    declare id_matricula: string

    @ForeignKey(() => Aeronave)
    @Column({
        type: DataType.STRING(4),
        allowNull: false
    })
    declare icao_aeronave : string

    @ForeignKey(() => Calificador)
    @Column({
        type: DataType.STRING(5),
        allowNull: false
    })
    declare id_calificador : string

    @ForeignKey(() => Compania)
    @Column({
        type: DataType.STRING(5),
        allowNull: false
    })
    declare id_compania : string

    @Column({
        type: DataType.DATE(),
        allowNull: false
    })
    declare fecha_registro: Date

    @Column({
        type: DataType.DATE()
    })
    declare fecha_modificacion: Date

    @BelongsTo(() => Aeronave)
    declare aeronave: Aeronave;

    @BelongsTo(() => Calificador)
    declare calificador: Calificador;

    @BelongsTo(() => Compania)
    declare compania: Compania;
}

export default Matricula