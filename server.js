const express= require('express')
const cors=require('cors');
const manager = require('./controlleurs/manager/ManagerControlleur.js')

const app = express()

app.use(express.json());
app.use(cors());

const managerRouter = require('./routes/manager/ManagerRoute.js')
app.use('/managers',managerRouter)

app.listen(5000, () => {console.log("http://localhost:5000/")})

