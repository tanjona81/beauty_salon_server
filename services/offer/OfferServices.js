const Offer = require('../../schemas/OfferSchema.js')
const Customer = require('../../schemas/CustomerSchema.js')
const Service = require('../../schemas/ServiceSchema.js')
const mongoose = require('mongoose')
const gmail = require('../../Utils/Gmail.js')

const getAll = async () => {
    return await Offer.find();
}

const getById = async (id) => {
    return await Offer.findOne({_id : id})
    .populate("id_customer")
    .populate("id_service");
}

const create = async (id_customer, id_service, reduction, date_heure_fin) =>  {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    const _id_service = new mongoose.Types.ObjectId(id_service);

    const offer_exist = await Offer.aggregate([
        {
            $match: {
                id_customer: _id_customer,
                id_service: _id_service,
                $expr:{
                    $gte: ["$date_heure_fin", new Date()]
                }
            }
        }
    ])

    console.log(offer_exist);

    //Check if there is already an Offer with this customer for that specific service
    // if(offer_exist.length > 0 && (new Date(date_heure_fin).getTime()) <= new Date(offer_exist[0].date_heure_fin).getTime())
    if(offer_exist.length > 0) 
        return ({
            message:"There is already an Offer with this customer for that specific service",
            code: 'offer_exist'
            })

    const customer = await Customer.findById(id_customer)
    const service = await Service.findById(id_service)

    // console.log(customer)
    // console.log(service)

    let offer = new Offer();
    offer.id_customer = id_customer
    offer.id_service = id_service
    offer.reduction = reduction
    offer.date_heure_fin = date_heure_fin
    const rep = await offer.save()
    gmail.sendOffer(customer.email, customer.nom, service.nom, reduction, date_heure_fin)
    return rep
}

const update = async (id, id_customer, id_service, reduction, date_heure_fin) => {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    const _id_service = new mongoose.Types.ObjectId(id_service);

    const offer_exist = await Offer.aggregate([
        {
            $match: {
                id_customer: _id_customer,
                id_service: _id_service,
                $expr:{
                    $gte: [date_heure_fin, new Date()]
                }
            }
        }
    ])

    //Check if there is already an Offer with this customer for that specific service
    if(offer_exist.length > 0 && (new Date(date_heure_fin).getTime()) <= offer_exist[0].date_heure_fin) 
    throw new Error("There is already an Offer with this customer for that specific service")

    let offer = await Offer.findById(id)
    if(id_customer !== undefined && id_customer !== null) offer.id_customer = id_customer
    if(id_service !== undefined && id_customer !== null) offer.id_service = id_service
    if(reduction !== undefined && id_customer !== null) offer.reduction = reduction
    if(date_heure_fin !== undefined && id_customer !== null) offer.date_heure_fin = date_heure_fin
    return await offer.save()
}

const delete_offer = async (id) => {
    return await Offer.deleteOne({ _id : id });
}

const getAllOffreUptoDate = async () => {
    return await Offer.find()
    .where("date_heure_fin")
    .gte(new Date())
    .populate("id_customer")
    .populate("id_service")
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_offer,
    getAllOffreUptoDate
}