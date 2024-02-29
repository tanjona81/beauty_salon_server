const Employe = require("../../schemas/EmployeSchema.js");
const Customer = require("../../schemas/CustomerSchema.js");
const Rendezvous = require("../../schemas/RendezvousSchema.js");
const Service = require('../../schemas/ServiceSchema.js')
const cron = require("node-cron");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const sendmail = require("../../Utils/Gmail.js");
const config = require("../../config/auth.config.js");
const utils = require('../../Utils/Time.js')

const login = async (email, mdp) => {
  const user = await Employe.findOne({ email: email , is_activated: 1});
  const test = await bcrypt.compare(mdp, user.mdp);
  if (test) {
    const usertoken = {
      _id: user._id,
      nom: user.nom,
      role: "employe",
    };
    const accessToken = jwt.sign(usertoken, config.secret);
    return accessToken;
  } else return null;
};

const getAll = async () => {
  return await Employe.find();
};

const getById = async (id) => {
  return await Employe.findOne({ _id: id });
};

const create = async (
  image,
  nom,
  prenom,
  sexe,
  tel,
  email,
  addresse,
  mdp,
  heure_debut,
  heure_fin
) => {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the generated salt
  const hashedmdp = await bcrypt.hash(mdp, salt);

  let employe = new Employe();
  employe.image = image;
  employe.nom = nom;
  employe.mdp = hashedmdp;
  employe.prenom = prenom;
  employe.sexe = sexe;
  employe.tel = tel;
  employe.email = email;
  employe.addresse = addresse;
  employe.heure_debut = heure_debut;
  employe.heure_fin = heure_fin;
  return await employe.save();
};

const update = async (
  id,
  image,
  nom,
  prenom,
  sexe,
  tel,
  email,
  addresse,
  mdp,
  heure_debut,
  heure_fin,
  is_activated
) => {
  let employe = await Employe.findById(id);
  if (image !== undefined) employe.image = image;
  if (nom !== undefined) employe.nom = nom;
  if (mdp !== undefined && mdp !== null) {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedmdp = await bcrypt.hash(mdp, salt);
    employe.mdp = hashedmdp;
  }
  if (prenom !== undefined) employe.prenom = prenom;
  if (sexe !== undefined) employe.sexe = sexe;
  if (tel !== undefined) employe.tel = tel;
  if (email !== undefined) employe.email = email;
  if (addresse !== undefined) employe.addresse = addresse;
  if (heure_debut !== undefined) employe.heure_debut = heure_debut;
  if (heure_fin !== undefined) employe.heure_fin = heure_fin;
  if (is_activated !== undefined) employe.is_activated = is_activated;
  return await employe.save();
};

const delete_employe = async (id) => {
  return await Employe.deleteOne({ _id: id });
};

const getRendezvous = async (id_employe) => {
  return await Rendezvous.where("id_employe")
    .equals(id_employe)
    .where("is_valid")
    .equals(0)
    .populate("id_service")
    .populate("id_customer");
};

const getDoneRendezvous = async (id_employe) => {
  return await Rendezvous.where("id_employe")
    .equals(id_employe)
    .where("is_valid")
    .equals(1)
    .populate("id_service")
    .populate("id_customer");
};

const validate_rendezvous = async (id_rendezvous) => {
  const rdv = await Rendezvous.findById(id_rendezvous);
  const date_plus_1mn = new Date(rdv.date_heure.getTime() - 1 * 60000);
  const customer = await Customer.findById(rdv.id_customer);

  // Send validation email to the customer
  sendmail.validation(
    customer.email,
    customer.nom,
    rdv.date_heure.toISOString().slice(0, 10),
    rdv.date_heure.toTimeString().slice(0, 8)
  );

  // send a reminder email to the customer 1mn after
  cron.schedule(
    `${date_plus_1mn.getMinutes()} ${date_plus_1mn.getHours()} ${date_plus_1mn.getDate()} 
    ${date_plus_1mn.getMonth() + 1} *`,
    () => {
      sendmail.reminder(
        customer.email,
        customer.nom,
        rdv.date_heure.toISOString().slice(0, 10),
        rdv.date_heure.toTimeString().slice(0, 8)
      );
    }
  );

  rdv.is_valid = 1;
  return await rdv.save();
};

const commission_per_day = async (id_employe) => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format

  const _id_employe = new mongoose.Types.ObjectId(id_employe);
  return await Rendezvous.aggregate([
    {
      $match: {
        id_employe: _id_employe,
        is_valid: 1,
        $expr: {
          $eq: [
            { $dateToString: { format: "%Y-%m-%d", date: "$date_heure" } },
            formattedCurrentDate,
          ],
        },
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "id_service",
        foreignField: "_id",
        as: "service",
      },
    },
    {
      $unwind: { path: "$service" },
    },
    {
      $group: {
        _id: { id_employe: "$id_employe", date: formattedCurrentDate },
        total: {
          $sum: {
            $multiply: [
              "$service.prix",
              { $divide: ["$service.commission", 100] },
            ],
          },
        },
        // total: { $sum: "$service.prix" }
      },
    },
    {
      $project: {
        _id: 0,
        id_employe: "$_id.id_employe",
        date: "$_id.date",
        total: 1,
      },
    },
  ]);
};

const accept_rendezvous_no_employe = async (id_rendezvous, id_employe) => {
  const rdv = await Rendezvous.findById(id_rendezvous);
  const date_plus_1mn = new Date(rdv.date_heure.getTime() - 1 * 60000);
  const customer = await Customer.findById(rdv.id_customer);
  const employe = await Employe.findOne({_id : id_employe, is_activated: 1});
  const service = await Service.findOne({_id : rdv.id_service, is_activated: 1})

  if(!employe || !service) return {message:`Employe or service not activated`}

  // Convert the date_heure parameter into Date
  const date = new Date(rdv.date_heure)
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const time_date = utils.stringToTime(date.toLocaleTimeString(undefined, options)); 

  // date_heure + service.duree
  let date_heure_plus_duree = new Date(date.getTime() + service.duree * 60000)
  const time_date_plus_duree = utils.stringToTime(date_heure_plus_duree.toLocaleTimeString(undefined, options)); 

  const time_debut = utils.stringToTime(employe.heure_debut)
  const time_fin = utils.stringToTime(employe.heure_fin)

  // Consvert the date_heure parameter into string Y-M-D
  const formatted_date_string = date.toISOString().slice(0, 10)

  // Convert id_employe into objectId
  const _id_employe = new mongoose.Types.ObjectId(id_employe);

  const rendezvous_valid = await Rendezvous.aggregate([
      {
          $match:{
              id_employe: _id_employe,
              is_valid: 1,
              $expr: {
                  $eq: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$date_heure" } },
                      formatted_date_string
                  ]
              }
          }

      },
      {
          $lookup: {
              from: 'services',
              localField: 'id_service',
              foreignField: '_id',
              as: 'service'
          }
      },
      {
          $unwind: { path: "$service" }
      },
      {
          $project: {
              _id: 0,
              id_employe: 1,
              date_heure: 1,
              "service.duree": 1
          }
      }
  ])

  // Check if the employe work on the parameter date
  if(time_date.getTime() < time_debut.getTime() || time_date.getTime() > time_fin.getTime()
      || time_date_plus_duree.getTime() > time_fin.getTime()) 
      return {message:`${employe.nom} doesn't work on this date`}
  
  // console.log(rendezvous_valid)
  for(let i=0;i<rendezvous_valid.length;i++){
      let rendezvousdate_plus_duree = new Date(rendezvous_valid[i].date_heure.getTime() + rendezvous_valid[i].service.duree * 60000)
      // console.log(rendezvous_valid[i].date_heure.getTime())
      // console.log(date.getTime())
      // console.log(rendezvousdate_plus_duree.getTime())

      // Check if date between a valid rendezvous and a valid rendezvous + duree of the service
      // Check if date_heure_plus_duree between a valid rendezvous and a valid rendezvous + duree of the service
      if((date.getTime() >= rendezvous_valid[i].date_heure && date.getTime() <= rendezvousdate_plus_duree) ||
          (date_heure_plus_duree.getTime() >= rendezvous_valid[i].date_heure && 
          date_heure_plus_duree.getTime() <= rendezvousdate_plus_duree))
          return {message:`${employe.nom} has already a meeting on this date`}
  }

  // Send validation email to the customer
  sendmail.validation(
    customer.email,
    customer.nom,
    rdv.date_heure.toISOString().slice(0, 10),
    rdv.date_heure.toTimeString().slice(0, 8)
  );

  // send a reminder email to the customer 1mn after
  cron.schedule(
    `${date_plus_1mn.getMinutes()} ${date_plus_1mn.getHours()} ${date_plus_1mn.getDate()} 
    ${date_plus_1mn.getMonth() + 1} *`,
    () => {
      sendmail.reminder(
        customer.email,
        customer.nom,
        rdv.date_heure.toISOString().slice(0, 10),
        rdv.date_heure.toTimeString().slice(0, 8)
      );
    }
  );

  rdv.id_employe = id_employe
  rdv.is_valid = 1;
  return rdv;
};

const getAllActif = async () => {
  return await Employe.find({is_activated: 1});
};

const getRendezvousAssigne = async (id_employe) => {
  return await Rendezvous.where("id_employe")
    .equals(id_employe)
    .populate("id_service")
    .populate("id_customer")
    .sort({date_heure: -1});
};

const getRendezvousAssigneUpToDate = async (id_employe) => {
  return await Rendezvous.where("id_employe")
    .equals(id_employe)
    .where("date_heure")
    .gte(new Date())
    .where("is_valid")
    .equals(0)
    .populate("id_service")
    .populate("id_customer")
    .sort({date_heure: -1});
};

const getRendezvousUpToDate = async (id_employe) => {
  return await Rendezvous.where("id_employe")
    .equals(id_employe)
    .where("date_heure")
    .gte(new Date())
    .populate("id_service")
    .populate("id_customer")
    .sort({date_heure: -1});
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete_employe,
  login,
  getRendezvous,
  getDoneRendezvous,
  validate_rendezvous,
  commission_per_day,
  accept_rendezvous_no_employe,
  getAllActif,
  getRendezvousAssigne,
  getRendezvousAssigneUpToDate,
  getRendezvousUpToDate
};
