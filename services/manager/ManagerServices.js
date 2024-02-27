const Manager = require("../../schemas/ManagerSchema.js");
const Rendezvous = require("../../schemas/RendezvousSchema.js");
const Employe = require("../../schemas/EmployeSchema.js");
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
  return Employe.aggregate([
    {
      $lookup: {
        from: "rendezvous",
        localField: "_id",
        foreignField: "id_employe",
        as: "rendezvous",
      },
    },
    {
      $unwind: { path: "$rendezvous", preserveNullAndEmptyArrays: true},
    },
    {
      $lookup: {
        from: "services",
        localField: "rendezvous.id_service",
        foreignField: "_id",
        as: "services",
      },
    },
    {
      $unwind: { path: "$services", preserveNullAndEmptyArrays: true},
    },
    {
      $match: {
        $expr:{
          $or: [
            { $eq: ["$rendezvous.is_valid", 1] },
            {$eq: [{ $ifNull: ["$rendezvous", null] }, null]}
          ],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        image: { $first: "$image" },
        nom: { $first: "$nom" },
        email: { $first: "$email" },
        tel: { $first: "$tel" },
        created_at: { $first: "$created_at" },
        moyenne: { $avg: "$services.duree" },
      },
    },
    {
      $project: {
        _id: 1,
        image: 1,
        nom: 1,
        email: 1,
        tel: 1,
        created_at: 1,
        moyenne: {
          $cond: {
              if: { $eq: ["$moyenne", null] },
              then: 0,
              else: "$moyenne"
          }
        },
      },
    },
    {
      $sort:{
        moyenne: -1
      }
    }
  ]);
};

const nbrReservation_jour = async () => {
  const rdv_day = await RdvTracking.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$date" }, { $month: new Date() }],
        },
      }
    },
    {
      $group: {
        // _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        _id: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
        count: { $sum: 1 },
      },
    }
  ]);

  const last_day = getLastDayOfMonth(rdv_day[0]._id.year,rdv_day[0]._id.month)

  let rep = [];

  for(let i=0;i<last_day;i++){
    rep[i] = { 
      value: 0, 
      name: i+1, 
      year : rdv_day[0]._id.year 
    }
  }

  // push the data from databse into rep[]
  for(let i=0;i<rdv_day.length;i++){
    rep[ rdv_day[i]._id.day -1 ].value = rdv_day[i].count
  }

  return rep
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
    { value: 0, name: "Janvier", year : new Date().getFullYear() },
    { value: 0, name: "Fevrier", year : new Date().getFullYear() },
    { value: 0, name: "Mars", year : new Date().getFullYear() },
    { value: 0, name: "Avril", year : new Date().getFullYear() },
    { value: 0, name: "Mais", year : new Date().getFullYear() },
    { value: 0, name: "Juin", year : new Date().getFullYear() },
    { value: 0, name: "Juillet", year : new Date().getFullYear() },
    { value: 0, name: "Aout", year : new Date().getFullYear() },
    { value: 0, name: "Septembre", year : new Date().getFullYear() },
    { value: 0, name: "Octobre", year : new Date().getFullYear() },
    { value: 0, name: "Novembre", year : new Date().getFullYear() },
    { value: 0, name: "Decembre", year : new Date().getFullYear() },
  ]

    for(let i=0;i<rdv_mois.length;i++){
      month[rdv_mois[i]._id.month - 1].value = rdv_mois[i].count
    }

  return month
};

const chiffreAffaire_jour = async () => {
  const CA_jour = await Payment.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$created_at" }, { $month: new Date() }],
        },
      }
    },
    {
      $group: {
        // _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
        _id: { year: { $year: "$created_at" }, month: { $month: "$created_at" }, day: { $dayOfMonth: "$created_at" } },
        chiffre: {
          $sum: "$prix",
        },
      },
    }
  ]);

  const last_day = getLastDayOfMonth(CA_jour[0]._id.year,CA_jour[0]._id.month)

  let rep = [];

  for(let i=0;i<last_day;i++){
    rep[i] = { 
      value: 0, 
      name: i+1, 
      year : CA_jour[0]._id.year 
    }
  }

  // push the data from databse into rep[]
  for(let i=0;i<CA_jour.length;i++){
    rep[ CA_jour[i]._id.day -1 ].value = CA_jour[i].chiffre
  }

  return rep;
};

const chiffreAffaire_mois = async () => {
  const CA_mois = await Payment.aggregate([
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

  const month = [
    { value: 0, name: "Janvier", year : new Date().getFullYear() },
    { value: 0, name: "Fevrier", year : new Date().getFullYear() },
    { value: 0, name: "Mars", year : new Date().getFullYear() },
    { value: 0, name: "Avril", year : new Date().getFullYear() },
    { value: 0, name: "Mais", year : new Date().getFullYear() },
    { value: 0, name: "Juin", year : new Date().getFullYear() },
    { value: 0, name: "Juillet", year : new Date().getFullYear() },
    { value: 0, name: "Aout", year : new Date().getFullYear() },
    { value: 0, name: "Septembre", year : new Date().getFullYear() },
    { value: 0, name: "Octobre", year : new Date().getFullYear() },
    { value: 0, name: "Novembre", year : new Date().getFullYear() },
    { value: 0, name: "Decembre", year : new Date().getFullYear() },
  ]

    for(let i=0;i<CA_mois.length;i++){
      month[CA_mois[i]._id.month-1].value = CA_mois[i].chiffre
    }

  return month
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

  let paid_chiffre = 0
  if(paid.length > 0) paid_chiffre = Number(paid[0].chiffre.toFixed(2))
  
  let CA_minus_commission_chiffre = 0
  if(CA_minus_commission.length > 0) CA_minus_commission_chiffre = Number(CA_minus_commission[0].chiffre.toFixed(2))

  const rep = {
    mois: mois,
    year: new Date().getFullYear(),
    CA:
      paid_chiffre -
      (CA_minus_commission_chiffre + loyer + piece + autres),
    salaire: CA_minus_commission_chiffre,
    payment: paid_chiffre
  };

  return rep;
};

function getLastDayOfMonth(year, month) {
  // Create a new Date object set to the first day of the next month
  // pointer of month begin ato 0 so month +1 = month
  const nextMonth = new Date(year, month, 1);
  // Subtract one day from the next month to get the last day of the current month
  const lastDayOfMonth = new Date(nextMonth - 1);
  // Return the date component of the last day of the month
  return lastDayOfMonth.getDate();
}

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
