const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/rendezvous/RendezvousServices.js')

const getRendezvous = () => {
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

const getRendezvousById = () => {
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

const createRendezvous = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {id_customer, id_service, id_employe, date_heure} = req.body;
            await service.create(id_customer, id_service, id_employe, date_heure)
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

const updateRendezvous = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {id_customer, id_service, id_employe, date_heure, is_valid} = req.body;
            await service.update(req.params.id, id_customer, id_service, id_employe, date_heure, is_valid)
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

const deleteRendezvous = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.delete_rendezvous(req.params.id)
            .then((result)=>{
                return res.status(204).json("Rendezvous deleted")
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
    getRendezvous,
    getRendezvousById,
    createRendezvous,
    updateRendezvous,
    deleteRendezvous
}