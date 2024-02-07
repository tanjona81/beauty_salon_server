const Manager = require('../../schemas/Manager.js')
const db = require('../../config/DbConfig.js')

const getAll = async () => {
    return await Manager.find();
}

const getById = async (id) => {
    return await Manager.findOne({_id : id});
}

const create = async (nom, mdp) =>  {
    let manager = new Manager();
    manager.nom = nom
    manager.mdp = mdp
    return await manager.save()
}

const update = async (id, nom, mdp) => {
    let manager = await Manager.findById(id)
    manager.nom=nom
    manager.mdp = mdp
    return await manager.save()
}

const delete_manager = async (id) => {
    return await Manager.deleteOne({ _id : id });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_manager
}