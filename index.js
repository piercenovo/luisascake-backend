const app = require('./src/app')
const config = require('./src/config')

// Variables localhost and port
app.listen(config.port, () => console.log(`Server running at http://${config.host}:${config.port}...`))
