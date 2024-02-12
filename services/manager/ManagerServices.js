const Manager = require('../../schemas/ManagerSchema.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (nom, mdp) => {
    const user = await Manager.findOne({nom:nom})
    const test = await bcrypt.compare(mdp, user.mdp)
    if(test) {
        const usertoken = {
            _id : user._id,
            nom : user.nom
        }
        const accessToken = jwt.sign(usertoken,"secret")
        return accessToken;
    }
    else return null;
}

const getAll = async () => {
    return await Manager.find();
}

const getById = async (id) => {
    return await Manager.findOne({_id : id});
}

const create = async (nom, mdp) =>  {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedmdp = await bcrypt.hash(mdp, salt);

    let manager = new Manager();
    manager.nom = nom
    manager.mdp = hashedmdp
    return await manager.save()
}

const update = async (id, nom, mdp) => {
    let manager = await Manager.findById(id)
    if(nom !== undefined) manager.nom=nom
    if(mdp !== undefined) {
        // Generate a salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password using the generated salt
        const hashedmdp = await bcrypt.hash(mdp, salt);
        employe.mdp = hashedmdp
    }
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
    delete_manager,
    login
}