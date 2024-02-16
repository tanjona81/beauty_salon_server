const Offer = require('../../schemas/OfferSchema.js')

const getAll = async () => {
    return await Offer.find();
}

const getById = async (id) => {
    return await Offer.findOne({_id : id});
}

const create = async (id_customer, id_service, reduction, date_heure_fin) =>  {
    let offer = new Offer();
    offer.id_customer = id_customer
    offer.id_service = id_service
    offer.reduction = reduction
    offer.date_heure_fin = date_heure_fin
    return await offer.save()
}

const update = async (id, id_customer, id_service, reduction, date_heure_fin) => {
    let offer = await Offer.findById(id)
    if(id_customer !== undefined) offer.id_customer = id_customer
    if(id_service !== undefined) offer.id_service = id_service
    if(reduction !== undefined) offer.reduction = reduction
    if(date_heure_fin !== undefined) offer.date_heure_fin = date_heure_fin
    return await offer.save()
}

const delete_offer = async (id) => {
    return await Offer.deleteOne({ _id : id });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_offer
}