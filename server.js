const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const managerRouter = require("./routes/manager/ManagerRoute.js");
app.use("/api/managers", managerRouter);

const ServiceRouter = require("./routes/service/ServiceRoute.js");
app.use("/api/services", ServiceRouter);

const EmployeRouter = require("./routes/employe/EmployeRoute.js");
app.use("/api/employes", EmployeRouter);

const CustomerRouter = require("./routes/customer/CustomerRoute.js");
app.use("/api/customers", CustomerRouter);

const rendezvousRouter = require("./routes/rendezvous/RendezvousRoute.js");
app.use("/api/rendezvous", rendezvousRouter);

const preferenceRouter = require('./routes/preference/PreferenceRoute.js')
app.use('/api/preferences',preferenceRouter)

const offerRouter = require('./routes/offer/OfferRoute.js')
app.use('/api/offers',offerRouter)

const Blacklist_tokenRouter = require('./routes/blacklist_token/Blacklist_tokenRoute.js')
app.use('/api/blacklist',Blacklist_tokenRouter)

app.listen(5000, () => {
  console.log("http://localhost:5000/");
});
