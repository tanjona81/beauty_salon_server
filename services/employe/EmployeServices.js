const Employe = require('../../schemas/EmployeSchema.js')
const Rendezvous = require('../../schemas/RendezvousSchema.js')
const RendezvousServices = require('../rendezvous/RendezvousServices.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (email, mdp) => {
    const user = await Employe.findOne({email:email})
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
    return await Employe.find();
}

const getById = async (id) => {
    return await Employe.findOne({_id : id});
}

const create = async (image, nom, prenom, tel, email, addresse, mdp, heure_debut, heure_fin) =>  {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedmdp = await bcrypt.hash(mdp, salt);

    let employe = new Employe();
    employe.image = image
    employe.nom = nom
    employe.mdp = hashedmdp
    employe.prenom = prenom
    employe.tel = tel
    employe.email = email
    employe.addresse = addresse
    employe.heure_debut = heure_debut
    employe.heure_fin = heure_fin
    return await employe.save()
}

const update = async (id, image, nom, prenom, tel, email, addresse, mdp, heure_debut, heure_fin) => {
    let employe = await Employe.findById(id)
    if(image !== undefined) employe.image = image
    if(nom !== undefined) employe.nom = nom
    if(mdp !== undefined) {
        // Generate a salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password using the generated salt
        const hashedmdp = await bcrypt.hash(mdp, salt);
        employe.mdp = hashedmdp
    }
    if(prenom !== undefined) employe.prenom = prenom
    if(tel !== undefined) employe.tel = tel
    if(email !== undefined) employe.email = email
    if(addresse !== undefined) employe.addresse = addresse
    if(heure_debut !== undefined) employe.heure_debut = heure_debut
    if(heure_fin !== undefined) employe.heure_fin = heure_fin
    return await employe.save()
}

const delete_employe = async (id) => {
    return await Employe.deleteOne({ _id : id });
}

const getRendezvous = async (id_employe) => {
    return await Rendezvous.where("id_employe")
                        .equals(id_employe)
                        .where("is_valid")
                        .equals(0)
                        .populate("id_service")
                        .populate("id_customer")
}

const getDoneRendezvous = async (id_employe) => {
    return await Rendezvous.where("id_employe")
                        .equals(id_employe)
                        .where("is_valid")
                        .equals(1)
                        .populate("id_service")
                        .populate("id_customer")
}

const validate_rendezvous = async (id_rendezvous) => {
    return await RendezvousServices.update(id_rendezvous,undefined,undefined,undefined,undefined,1)
}

const commission_per_day = async (id_employe) => {
    
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_employe,
    login,
    getRendezvous,
    getDoneRendezvous,
    validate_rendezvous
}