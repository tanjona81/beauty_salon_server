const Preference = require('../../schemas/PreferenceSchema.js')
const Service = require('../../schemas/ServiceSchema.js')
const mongoose = require('mongoose')

const getAll = async () => {
    return await Preference.find();
}

const getById = async (id) => {
    return await Preference.findOne({_id : id});
}

const create = async (id_customer, id_prefere, designation) =>  {
    let preference = new Preference();
    preference.id_customer = id_customer
    preference.id_prefere = id_prefere
    preference.designation = designation
    return await preference.save()
}

const update = async (id, id_customer, id_prefere, designation) => {
    let preference = await Preference.findById(id)
    if(id_customer !== undefined) preference.id_customer = id_customer
    if(id_prefere !== undefined) preference.id_prefere = id_prefere
    if(designation !== undefined) preference.designation = designation
    return await preference.save()
}

const delete_preference = async (id) => {
    return await Preference.deleteOne({ _id : id });
}

const find_and_delete_preference = async (id_customer, id_prefere, designation) => {
    return await Preference.findOneAndDelete({ id_customer, id_prefere, designation });
}

const employe_prefere = async (id_customer) => {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    return await Preference.aggregate([
        {
            $match: {
                id_customer: _id_customer,
                designation: "employe"
            }
        },
        {
            $lookup: {
                from: 'employes',
                localField: 'id_prefere',
                foreignField: '_id',
                as: 'employe'
            }
        },
        {
            $unwind: { path: "$employe" }
        },
        {
            $project: {
                _id: 0,
                employe: "$employe"
            }
        }
    ]);
}

const service_prefere = async (id_customer) => {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    return await Preference.aggregate([
        {
            $match: {
                id_customer: _id_customer,
                designation: "service"
            }
        },
        {
            $lookup: {
                from: 'services',
                localField: 'id_prefere',
                foreignField: '_id',
                as: 'services'
            }
        },
        {
            $unwind: { path: "$services" }
        },
        {
            $project: {
                _id: 0,
                services: "$services"
            }
        }
    ]);
}

const all_service_plus_prefere = async (id_customer) => {
    const _id_customer = new mongoose.Types.ObjectId(id_customer);
    return await Service.aggregate([
        {
            $lookup: {
                from: 'preferences',
                localField: '_id',
                foreignField: 'id_prefere',
                as: 'preferences'
            }
        },
        {
            $unwind: { path: "$preferences", preserveNullAndEmptyArrays: true }
        },
        {
            $addFields:{
                is_prefered: {
                  $cond: {
                      if: { $or: [
                        { $eq: [{ $ifNull: ["$preferences", null] }, null] },
                        { $ne: ["$preferences.id_customer", _id_customer] }
                      ] },
                      then: false,
                      else: true
                  }
                }
              }
        },
        {
            $sort:{
                is_prefered: -1
            }
        },
        {
            $group: {
              _id: "$_id",
              nom: { $first: "$nom" },
              prix: { $first: "$prix" },
              duree: { $first: "$duree" },
              commission: { $first: "$commission" },
              created_at: { $first: "$created_at" },
              is_prefered: { $first: "$is_prefered" },
            },
          },
        // {
        //     $match: {
        //         $or: [
        //             {
        //                 $and: [
        //                     {$expr:{ $eq:["$preferences.id_customer", _id_customer] } },
        //                     {$expr:{ $eq:["$preferences.designation", "service"] } }
        //                 ]
        //             },
        //             { $expr:{ $eq: [{ $ifNull: ["$preferences", null] }, null] } }
        //         ]
                
        //     }
        // },
    ]);
    // return await Preference.aggregate([
    //     {
    //         $match: {
    //             id_customer: _id_customer,
    //             designation: "service"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'services',
    //             localField: 'id_prefere',
    //             foreignField: '_id',
    //             as: 'services'
    //         }
    //     },
    //     {
    //         $unwind: { path: "$services" }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             services: "$services"
    //         }
    //     }
    // ]);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_preference,
    employe_prefere,
    service_prefere,
    all_service_plus_prefere,
    find_and_delete_preference
}