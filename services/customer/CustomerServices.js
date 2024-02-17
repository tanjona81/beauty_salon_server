const Customer = require("../../schemas/CustomerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

const login = async (email, mdp) => {
  const user = await Customer.findOne({ email: email });
  const test = await bcrypt.compare(mdp, user.mdp);
  if (test) {
    const usertoken = {
      _id: user._id,
      nom: user.nom,
      role: "customer",
    };
    const accessToken = jwt.sign(usertoken, config.secret);
    return accessToken;
  } else return null;
};

const getAll = async () => {
  return await Customer.find();
};

const getById = async (id) => {
  return await Customer.findOne({ _id: id });
};

const create = async (image, nom, prenom, tel, email, addresse, mdp) => {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the generated salt
  const hashedmdp = await bcrypt.hash(mdp, salt);

  let customer = new Customer();
  customer.image = image;
  customer.nom = nom;
  customer.mdp = hashedmdp;
  customer.prenom = prenom;
  customer.tel = tel;
  customer.email = email;
  customer.addresse = addresse;
  return await customer.save();
};

const update = async (id, image, nom, prenom, tel, email, addresse, mdp) => {
  let customer = await Customer.findById(id);
  if (image !== undefined) customer.image = image;
  if (nom !== undefined) customer.nom = nom;
  if (mdp !== undefined) {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedmdp = await bcrypt.hash(mdp, salt);
    customer.mdp = hashedmdp;
  }
  if (prenom !== undefined) customer.prenom = prenom;
  if (tel !== undefined) customer.tel = tel;
  if (email !== undefined) customer.email = email;
  if (addresse !== undefined) customer.addresse = addresse;
  return await customer.save();
};

const delete_customer = async (id) => {
  return await Customer.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete_customer,
  login,
};
