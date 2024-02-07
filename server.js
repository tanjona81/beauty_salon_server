const express= require('express')
const cors=require('cors');
const manager = require('./controlleurs/manager/ManagerControlleur.js')
// const Manager = require('./schemas/Manager.js')
// const db = require('./config/DbConfig.js')
// const manager = require('./services/manager/ManagerServices.js')

const app = express()

app.use(express.json());
app.use(cors());

//  manager.getManager();
// const getAll = () => {
//     // try{
//         // Manager.find();
//         console.log(manager.getManager())
//     // } catch (e) {
//     //     console.log(e.message)
//     // }
    
// }

// getAll()

// console.log('e')

const managerRouter = require('./routes/manager/ManagerRoute.js')
app.use('/managers',managerRouter)

app.listen(5000, () => {console.log("http://localhost:5000/")})

