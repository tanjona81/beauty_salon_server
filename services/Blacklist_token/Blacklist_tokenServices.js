const Blacklist_token = require('../../schemas/Blacklist_tokenSchema.js')

const getAll = async () => {
    return await Blacklist_token.find();
}

const getById = async (id) => {
    return await Blacklist_token.findOne({_id : id});
}

const getByToken = async (token) => {
    return await Blacklist_token.findOne({token : token});
}

const create = async (token) =>  {
    let blk = new Blacklist_token();
    blk.token = token
    return await blk.save();
}

const update = async (id, token) => {
    let blacklist_token = await Blacklist_token.findById(id)
    if(token !== undefined) blacklist_token.token = token
    return await blacklist_token.save()
}

const delete_Blacklist_token = async (id) => {
    return await Blacklist_token.deleteOne({ _id : id });
}

module.exports = {
    getAll,
    getById,
    getByToken,
    create,
    update,
    delete_Blacklist_token
}