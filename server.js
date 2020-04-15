const app = require('express')()
var cors = require('cors')

const port = 3000
const bodyParser = require('body-parser');

// Routes file
const routeApi = require('./api-v2/routes/api')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api',routeApi)

app.listen(port,() => {
    console.log('Aplikasi berjalan di port : ' + port)
})