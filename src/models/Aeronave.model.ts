import { Table, Column, DataType, Model, PrimaryKey } from 'sequelize-typescript'

@Table({
    tableName: 'aeronave'
})

class Aeronave extends Model {
    
    @PrimaryKey
    @Column(DataType.STRING(4))
    declare icao_aeronave : string

    @Column({
        type: DataType.STRING(3),
        allowNull: false
    })
    declare iata_aeronave: string

    @Column({
        type: DataType.STRING(255)
    })
    declare descripcion: string

    @Column({
        type: DataType.INTEGER(),
        allowNull: false
    })
    declare max_pax: number

    @Column({
        type: DataType.FLOAT(),
        allowNull: false
    })
    declare mtow: number

    @Column({
        type: DataType.FLOAT(),
        allowNull: false
    })
    declare mzfw: number

    @Column({
        type: DataType.FLOAT(),
        allowNull: false
    })
    declare mldw: number

    @Column({
        type: DataType.FLOAT(),
        allowNull: false
    })
    declare ancho: number

    @Column({
        type: DataType.FLOAT(),
        allowNull: false
    })
    declare altura: number

    @Column({
        type: DataType.FLOAT(),
        allowNull: false
    })
    declare largo: number

    @Column({
        type: DataType.INTEGER()
    })
    declare no_motores: number

    @Column({
        type: DataType.STRING(100)
    })
    declare mo_motores: string
}

export default Aeronave