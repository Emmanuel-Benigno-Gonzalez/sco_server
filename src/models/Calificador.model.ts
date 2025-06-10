import { Table, Column, DataType, Model, PrimaryKey } from 'sequelize-typescript'


@Table({
    tableName: 'calificador'
})

class Calificador extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING(5))
    declare id_calificador: string

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare descripcion: string

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare clasificacion: string
}

export default Calificador