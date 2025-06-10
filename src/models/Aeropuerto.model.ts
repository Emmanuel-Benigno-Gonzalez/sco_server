import { Table, Column, DataType, Model, PrimaryKey } from 'sequelize-typescript'


@Table({
    tableName: 'aeropuerto'
})

class Aeropuerto extends Model{
    
    @PrimaryKey
    @Column(DataType.STRING(4))
    declare iata_aeropuerto: string

    @Column({
        type: DataType.STRING(4)
    })
    declare oaci_aeropuerto: string

    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string

    @Column({
        type: DataType.STRING(100)
    })
    declare ciudad: string

    @Column({
        type: DataType.STRING(100)
    })
    declare pais: string

    @Column({
        type: DataType.STRING(1)
    })
    declare tipo_aeropuerto: string

}

export default Aeropuerto