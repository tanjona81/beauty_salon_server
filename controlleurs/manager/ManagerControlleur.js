const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/manager/ManagerServices.js')

const loginManager = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.login(req.query.nom, req.query.mdp)
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

const getManager = () => {
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

const getManagerById = () => {
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

const createManager = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {nom,mdp} = req.body;
            await service.create(nom, mdp)
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

const updateManager = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {nom,mdp} = req.body;
            await service.update(req.params.id, nom, mdp)
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

const deleteManager = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.delete_manager(req.params.id)
            .then((result)=>{
                return res.status(204).json("Manager deleted")
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

const getTempsMoyenTravailPourChaqueEmpoye = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.getTempsMoyenTravailPourChaqueEmpoye()
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

const getNbrRdv_jour = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.nbrReservation_jour()
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

const getNbrRdv_mois = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.nbrReservation_mois()
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

const getChiffreAffaire_jour = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.chiffreAffaire_jour()
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

const getChiffreAffaire_mois = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.chiffreAffaire_mois()
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

const getCAMinusCost = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.beneficeparmois(req.query.mois, req.query.loyer, req.query.piece, req.query.autres)
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
    getManager,
    getManagerById,
    createManager,
    updateManager,
    deleteManager,
    loginManager,
    getTempsMoyenTravailPourChaqueEmpoye,
    getNbrRdv_jour,
    getNbrRdv_mois,
    getChiffreAffaire_jour,
    getChiffreAffaire_mois,
    getCAMinusCost
}