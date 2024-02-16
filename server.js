const express= require('express')
const cors=require('cors');
const app = express()

app.use(express.json());
app.use(cors());

const managerRouter = require('./routes/manager/ManagerRoute.js')
app.use('/managers',managerRouter)

const ServiceRouter = require('./routes/service/ServiceRoute.js')
app.use('/services',ServiceRouter)

const EmployeRouter = require('./routes/employe/EmployeRoute.js')
app.use('/employes',EmployeRouter)

const CustomerRouter = require('./routes/customer/CustomerRoute.js')
app.use('/customers',CustomerRouter)

const rendezvousRouter = require('./routes/rendezvous/RendezvousRoute.js')
app.use('/rendezvous',rendezvousRouter)

const preferenceRouter = require('./routes/preference/PreferenceRoute.js')
app.use('/preferences',preferenceRouter)

const offerRouter = require('./routes/offer/OfferRoute.js')
app.use('/offers',offerRouter)

app.listen(5000, () => {console.log("http://localhost:5000/")})

