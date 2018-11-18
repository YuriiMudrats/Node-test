const http=require('http')
const  app=require('./api')


const config= require('./config')

const server = http.createServer(app)

server.listen(config.PORT)