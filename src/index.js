import app from './api/app.js'
import { PORT } from './config/general.config.js'

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}...`))
