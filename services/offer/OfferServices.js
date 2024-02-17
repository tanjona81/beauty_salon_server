const Offer = require('../../schemas/OfferSchema.js')
const mongoose = require('mongoose')

const getAll = async () => {
    return await Offer.find();
}

const getById = async (id) => {
    return await Offer.findOne({_id : id});
}

const create = async (id_customer, id_service, reduction, date_heure_fin) =>  {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    const _id_service = new mongoose.Types.ObjectId(id_service);

    const offer_exist = await Offer.aggregate([
        {
            $match: {
                id_customer: _id_customer,
                id_service: _id_service
            }
        }
    ])

    //Check if there is already an Offer with this customer for that specific service
    if(offer_exist.length > 0 && (new Date(date_heure_fin).getTime()) <= offer_exist[0].date_heure_fin) 
    throw new Error("There is already an Offer with this customer for that specific service")

    let offer = new Offer();
    offer.id_customer = id_customer
    offer.id_service = id_service
    offer.reduction = reduction
    offer.date_heure_fin = date_heure_fin
    return await offer.save()
}

const update = async (id, id_customer, id_service, reduction, date_heure_fin) => {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    const _id_service = new mongoose.Types.ObjectId(id_service);

    const offer_exist = await Offer.aggregate([
        {
            $match: {
                id_customer: _id_customer,
                id_service: _id_service
            }
        }
    ])

    //Check if there is already an Offer with this customer for that specific service
    if(offer_exist.length > 0 && (new Date(date_heure_fin).getTime()) <= offer_exist[0].date_heure_fin) 
    throw new Error("There is already an Offer with this customer for that specific service")
    
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