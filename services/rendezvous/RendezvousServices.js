const Rendezvous = require('../../schemas/RendezvousSchema.js')

const getAll = async () => {
    return await Rendezvous.find();
}

const getById = async (id) => {
    return await Rendezvous.findOne({_id : id});
}

const create = async (id_customer, id_service, id_employe, date_heure) =>  {
    let rendezvous = new Rendezvous();
    rendezvous.id_customer = id_customer
    rendezvous.id_service = id_service
    rendezvous.id_employe = id_employe
    rendezvous.date_heure = date_heure
    return await rendezvous.save()
}

const update = async (id, id_customer, id_service, id_employe, date_heure, is_valid) => {
    let rendezvous = await Rendezvous.findById(id)
    if(id_customer !== undefined) rendezvous.id_customer=id_customer
    if(id_service !== undefined) rendezvous.id_service=id_service
    if(id_employe !== undefined) rendezvous.id_employe=id_employe
    if(date_heure !== undefined) rendezvous.date_heure=date_heure
    if(is_valid !== undefined) rendezvous.is_valid=is_valid
    return await rendezvous.save()
}

const delete_rendezvous = async (id) => {
    return await Rendezvous.deleteOne({ _id : id });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_rendezvous
}