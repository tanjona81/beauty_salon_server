const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/employe/EmployeServices.js')

const loginEmploye = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.login(req.query.email, req.query.mdp)
            .then((result)=>{
                if(!result) return res.status(401).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getEmploye = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.getAll()
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getEmployeById = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.getById(req.params.id)
            .then((result)=>{
                if(!result) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const createEmploye = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {image, nom, prenom, tel, email, addresse, mdp, heure_debut, heure_fin} = req.body;
            await service.create(image, nom, prenom, tel, email, addresse, mdp, heure_debut, heure_fin)
            .then((result)=>{
                return res.status(201).json(result)
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')                
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const updateEmploye = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {image, nom, prenom, tel, email, addresse, mdp, heure_debut, heure_fin} = req.body;
            await service.update(req.params.id, image, nom, prenom, tel, email, addresse, mdp, heure_debut, heure_fin)
            .then((result)=>{
                return res.status(200).json(result)
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const deleteEmploye = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.delete_employe(req.params.id)
            .then((result)=>{
                return res.status(204).json("Employe deleted")
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')                
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getRendezvousEmploye = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            // console.log(req.params.id)
            await service.getRendezvous(req.params.id)
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getDoneRendezvousEmploye = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            // console.log(req.params.id)
            await service.getDoneRendezvous(req.params.id)
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const validate_rendezvous = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            // console.log(req.params.id)
            await service.validate_rendezvous(req.params.id)
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getCommission = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            // console.log(req.params.id)
            await service.commission_per_day(req.params.id)
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }catch(e){
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send('Internal server error')
        }finally{
            // await mongoose.disconnect()
        }
    })
}

module.exports = {
    getEmploye,
    getEmployeById,
    createEmploye,
    updateEmploye,
    deleteEmploye,
    loginEmploye,
    getRendezvousEmploye,
    getDoneRendezvousEmploye,
    validate_rendezvous,
    getCommission
}