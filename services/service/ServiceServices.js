const Service = require('../../schemas/ServiceSchema.js')

const getAll = async () => {
    return await Service.find();
}

const getById = async (id) => {
    return await Service.findOne({_id : id});
}

const create = async (nom, prix, duree, commission) =>  {
    let ser = new Service();
    ser.nom = nom;
    ser.prix = prix;
    ser.duree = duree;
    ser.commission = commission;
    return await ser.save()
}

const update = async (id, nom, prix, duree, commission, is_activated) => {
    let ser = await Service.findById(id)
    if(nom !== undefined) ser.nom = nom;
    if(prix !== undefined) ser.prix = prix;
    if(duree !== undefined) ser.duree = duree;
    if(commission !== undefined) ser.commission = commission;
    if(is_activated !== undefined) ser.is_activated = is_activated;
    return await ser.save()
}

const delete_service = async (id) => {
    return await Service.deleteOne({ _id : id });
}

const getAllActif = async () => {
    return await Service.find({is_activated: 1});
}

const getAllLimit = async () => {
    return await Service.find()
    .limit(5);
  };
  
  const searchByName = async (name) => {
    return await Service.find({nom: { $regex: new RegExp(name, 'i') }, is_activated: 1 }).limit(5)
  };

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_service,
    getAllActif,
    getAllLimit,
    searchByName
}