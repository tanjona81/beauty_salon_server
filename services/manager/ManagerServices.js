const Manager = require("../../schemas/ManagerSchema.js");
const Rendezvous = require("../../schemas/RendezvousSchema.js");
const RdvTracking = require("../../schemas/RendezvoustrackingSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

const login = async (nom, mdp) => {
  const user = await Manager.findOne({ nom: nom });
  const test = await bcrypt.compare(mdp, user.mdp);
  if (test) {
    const usertoken = {
      _id: user._id,
      nom: user.nom,
      role: "manager",
    };
    const accessToken = jwt.sign(usertoken, config.secret);
    return accessToken;
  } else return null;
};

const getAll = async () => {
  return await Manager.find();
};

const getById = async (id) => {
  return await Manager.findOne({ _id: id });
};

const create = async (nom, mdp) => {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the generated salt
  const hashedmdp = await bcrypt.hash(mdp, salt);

  let manager = new Manager();
  manager.nom = nom;
  manager.mdp = hashedmdp;
  return await manager.save();
};

const update = async (id, nom, mdp) => {
  let manager = await Manager.findById(id);
  if (nom !== undefined) manager.nom = nom;
  if (mdp !== undefined) {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedmdp = await bcrypt.hash(mdp, salt);
    manager.mdp = hashedmdp;
  }
  return await manager.save();
};

const delete_manager = async (id) => {
  return await Manager.deleteOne({ _id: id });
};

const getTempsMoyenTravailPourChaqueEmpoye = async () => {
  return Rendezvous.aggregate([
    {
      $match: {
        is_valid: 1,
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
        _id: "$id_employe",
        moyenne: { $avg: "$service.duree" },
      },
    },
    {
      $project: {
        _id: "$_id",
        moyenne: 1,
      },
    },
  ]);
};

const nbrReservation_jour = async () => {
  return await RdvTracking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        count: { $sum: 1 },
      },
    },
  ]);
};

const nbrReservation_mois = async () => {
  return await RdvTracking.aggregate([
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        count: { $sum: 1 },
      },
    },
  ]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete_manager,
  login,
  getTempsMoyenTravailPourChaqueEmpoye,
  nbrReservation_jour,
  nbrReservation_mois,
};
