const Manager = require("../../schemas/ManagerSchema.js");
const Rendezvous = require("../../schemas/RendezvousSchema.js");
const Payment = require("../../schemas/PaymentSchema.js");
const RdvTracking = require("../../schemas/RendezvoustrackingSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

const login = async (nom, mdp) => {
  const user = await Manager.findOne({ nom: nom });
  const test = await bcrypt.compare(mdp, user.mdp);
  if (user && test) {
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
  const rdv_mois = await RdvTracking.aggregate([
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        count: { $sum: 1 },
      },
    },
  ]);

  const month = [
    { value: 0, name: "Janvie", year : rdv_mois[0]._id.year },
    { value: 0, name: "Fevrier", year : rdv_mois[0]._id.year },
    { value: 0, name: "Mars", year : rdv_mois[0]._id.year },
    { value: 0, name: "Avril", year : rdv_mois[0]._id.year },
    { value: 0, name: "Mais", year : rdv_mois[0]._id.year },
    { value: 0, name: "Juin", year : rdv_mois[0]._id.year },
    { value: 0, name: "Juillet", year : rdv_mois[0]._id.year },
    { value: 0, name: "Aout", year : rdv_mois[0]._id.year },
    { value: 0, name: "Septembre", year : rdv_mois[0]._id.year },
    { value: 0, name: "Octobre", year : rdv_mois[0]._id.year },
    { value: 0, name: "Novembre", year : rdv_mois[0]._id.year },
    { value: 0, name: "Decembre", year : rdv_mois[0]._id.year },
  ]

    for(let i=0;i<rdv_mois.length;i++){
      month[rdv_mois[i]._id.month].value = rdv_mois[i].count
    }

  return month
};

const chiffreAffaire_jour = async () => {
  return await Payment.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
        chiffre: {
          $sum: "$prix",
        },
      },
    }
  ]);
};

const chiffreAffaire_mois = async () => {
  return await Payment.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$created_at" },
          month: { $month: "$created_at" },
        },
        chiffre: {
          $sum: "$prix",
        },
      },
    }
  ]);
};

const beneficeparmois = async (mois, loyer, piece, autres) => {
  mois = parseInt(mois);
  loyer = parseInt(loyer);
  piece = parseInt(piece);
  autres = parseInt(autres);
  const CA_minus_commission = await Rendezvous.aggregate([
    {
      $match: {
        is_valid: 1,
        $expr: {
          $eq: [{ $year: "$date_heure" }, { $year: new Date() }],
        },
        $expr: {
          $eq: [{ $month: "$date_heure" }, mois],
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
        _id: {
          year: { $year: "$date_heure" },
          month: { $month: "$date_heure" },
        },
        chiffre: {
          $sum: {
            $multiply: [
              "$service.prix",
              { $divide: ["$service.commission", 100] },
            ],
          },
        },
      },
    },
  ]);

  const paid = await Payment.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $year: "$created_at" }, { $year: new Date() }],
        },
        $expr: {
          $eq: [{ $month: "$created_at" }, mois],
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$created_at" },
          month: { $month: "$created_at" },
        },
        chiffre: {
          $sum: "$prix",
        },
      },
    },
  ]);

  // console.log(CA_minus_commission[0].chiffre)
  // console.log(paid[0].chiffre)
  // console.log((CA_minus_commission[0].chiffre + loyer + piece + autres))
  let paid_chiffre = 0
  if(paid.length > 0) paid_chiffre = paid[0].chiffre
  
  let CA_minus_commission_chiffre = 0
  if(CA_minus_commission.length > 0) paid_chiffre = CA_minus_commission[0].chiffre

  const rep = {
    mois: mois,
    year: new Date().getFullYear(),
    CA:
      paid_chiffre -
      (CA_minus_commission_chiffre + loyer + piece + autres),
  };

  return rep;
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
  chiffreAffaire_jour,
  chiffreAffaire_mois,
  beneficeparmois,
};
