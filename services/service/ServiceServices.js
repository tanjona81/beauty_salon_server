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

const update = async (id, nom, prix, duree, commission) => {
    let ser = await Service.findById(id)
    if(nom !== undefined) ser.nom = nom;
    if(prix !== undefined) ser.prix = prix;
    if(duree !== undefined) ser.duree = duree;
    if(commission !== undefined) ser.commission = commission;
    return await ser.save()
}

const delete_service = async (id) => {
    return await Service.deleteOne({ _id : id });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_service
}