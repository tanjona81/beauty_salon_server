const Rendezvous = require('../../schemas/RendezvousSchema.js')
const Employe = require('../../schemas/EmployeSchema.js')
const Service = require('../../schemas/ServiceSchema.js')
const RdvTracking = require('../../schemas/RendezvoustrackingSchema.js')
const utils = require('../../Utils/Time.js')
const mongoose = require('mongoose')

const getAll = async () => {
    return await Rendezvous.find();
}

const getById = async (id) => {
    return await Rendezvous.findOne({_id : id});
}

const create = async (id_customer, id_service, id_employe, date_heure) =>  {
    const employe = await Employe.findOne({_id : id_employe});
    const service = await Service.findOne({_id : id_service})

    // Convert the date_heure parameter into Date
    const date = new Date(date_heure)

    // date_heure + service.duree
    let date_heure_plus_duree = new Date(date.getTime() + service.duree * 60000)

    const time_debut = utils.stringToTime(employe.heure_debut)
    const time_fin = utils.stringToTime(employe.heure_fin)

    // Consvert the date_heure parameter into string Y-M-D
    const formatted_date_string = date.toISOString().slice(0, 10)

    // Convert id_employe into objectId
    const _id_employe = new mongoose.Types.ObjectId(id_employe);

    const rendezvous_valid = await Rendezvous.aggregate([
        {
            $match:{
                id_employe: _id_employe,
                is_valid: 1,
                $expr: {
                    $eq: [
                        { $dateToString: { format: "%Y-%m-%d", date: "$date_heure" } },
                        formatted_date_string
                    ]
                }
            }

        },
        {
            $lookup: {
                from: 'services',
                localField: 'id_service',
                foreignField: '_id',
                as: 'service'
            }
        },
        {
            $unwind: { path: "$service" }
        },
        {
            $project: {
                _id: 0,
                id_employe: 1,
                date_heure: 1,
                "service.duree": 1
            }
        }
    ])

    // Check if the employe work on the parameter date
    if(date.getTime() < time_debut.getTime() || date.getTime() > time_fin.getTime()
        || date_heure_plus_duree.getTime() > time_fin.getTime()) 
        return {message:`${employe.nom} doesn't work on this date`}
    
    // console.log(rendezvous_valid)
    for(let i=0;i<rendezvous_valid.length;i++){
        let rendezvousdate_plus_duree = new Date(rendezvous_valid[i].date_heure.getTime() + rendezvous_valid[i].service.duree * 60000)
        // console.log(rendezvous_valid[i].date_heure.getTime())
        // console.log(date.getTime())
        // console.log(rendezvousdate_plus_duree.getTime())

        // Check if date between a valid rendezvous and a valid rendezvous + duree of the service
        // Check if date_heure_plus_duree between a valid rendezvous and a valid rendezvous + duree of the service
        if((date.getTime() >= rendezvous_valid[i].date_heure && date.getTime() <= rendezvousdate_plus_duree) ||
            (date_heure_plus_duree.getTime() >= rendezvous_valid[i].date_heure && 
            date_heure_plus_duree.getTime() <= rendezvousdate_plus_duree))
            return {message:`${employe.nom} has already a meeting on this date`}
    }
    
    let rendezvous = new Rendezvous();
    rendezvous.id_customer = id_customer
    rendezvous.id_service = id_service
    rendezvous.id_employe = id_employe
    rendezvous.date_heure = date_heure
    const rdvsave = await rendezvous.save();
    
    // Insert into rdv tracking
    let track = new RdvTracking();
    await track.save();

    return rdvsave;
    // return "ok";
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

const create_rdv_no_employe = async (id_customer, id_service, date_heure) =>  {
    let rendezvous = new Rendezvous();
    rendezvous.id_customer = id_customer
    rendezvous.id_service = id_service
    rendezvous.date_heure = date_heure
    const rdvsave = await rendezvous.save();
    
    // Insert into rdv tracking
    let track = new RdvTracking();
    await track.save();

    return rdvsave;
    // return "ok";
}

const get_rdv_no_employe = async () => {
    return await Rendezvous.aggregate([
        {
            $match:{
                $expr: {
                    $eq: [{ $ifNull: ["$id_employe", null] }, null]
                }
            }
        },
    ])
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_rendezvous,
    create_rdv_no_employe,
    get_rdv_no_employe
}