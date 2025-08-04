import { Table, Column, DataType, Model, PrimaryKey, BeforeCreate } from 'sequelize-typescript'

@Table({
    tableName: 'usuario'
})

class Usuario extends Model {

    @PrimaryKey
    @Column(DataType.INTEGER())
    declare id_usuario: number

    /*@Column({
        type: DataType.STRING(100),
        allowNull: true,
        unique: true
    })
    declare email: string*/

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    declare nombre: string

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    declare ap_paterno: string

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    declare ap_materno: string

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.INTEGER(),
        allowNull: false
    })
    declare tipo_usuario: number

    @Column({
        type: DataType.STRING(40),
    })
    declare descripcion: string

    @Column({
        type: DataType.INTEGER(),
    })
    declare token_password: number

    @BeforeCreate
    static asignarDescripcion(instance: Usuario) {
        switch (instance.tipo_usuario) {
            case 1:
                instance.descripcion = 'Administrador';
                break;
            case 2:
                instance.descripcion = 'Jefe de Turno';
                break;
            case 3:
                instance.descripcion = 'Capturador';
                break;
            default:
                instance.descripcion = 'Invitado';
        }
    }

}

export default Usuario