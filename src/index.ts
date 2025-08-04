import server from './server'
import colors from 'colors'
import { SERVER_PORT } from './config'

//const port = parseInt(SERVER_PORT) || 4000
const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log( colors.cyan.bold(`REST API en el puerto ${port}`))
} )