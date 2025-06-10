import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'


@Table({
    tableName: 'compania'
})

class Compania extends Model {

    @PrimaryKey
    @Column(DataType.STRING(5))
    declare id_compania

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare nombre: string
    
    @Column({
        type: DataType.STRING(20)
    })
    declare mostrador: string
}

export default Compania