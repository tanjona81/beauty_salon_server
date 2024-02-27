const Employe = require("../../schemas/EmployeSchema.js");
const Customer = require("../../schemas/CustomerSchema.js");
const Rendezvous = require("../../schemas/RendezvousSchema.js");
const cron = require("node-cron");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const sendmail = require("../../Utils/Gmail.js");
const config = require("../../config/auth.config.js");

const login = async (email, mdp) => {
  const user = await Employe.findOne({ email: email });
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
  heure_fin
) => {
  let employe = await Employe.findById(id);
  if (image !== undefined) employe.image = image;
  if (nom !== undefined) employe.nom = nom;
  if (mdp !== undefined) {
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

  // send a reminder email to the customer
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
  return rdv;
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
};
