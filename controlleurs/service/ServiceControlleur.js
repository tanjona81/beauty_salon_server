const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/service/ServiceServices.js')

const getService = () => {
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

const getServiceById = () => {
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

const createService = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {nom, prix, duree, commission} = req.body;
            await service.create(nom, prix, duree, commission)
            .then((result)=>{
                return res.status(201).json("Service saved")
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

const updateService = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {nom, prix, duree, commission} = req.body;
            await service.update(req.params.id, nom, prix, duree, commission)
            .then((result)=>{
                return res.status(200).json("Service updated")
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

const deleteService = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.delete_service(req.params.id)
            .then((result)=>{
                return res.status(204).json("Service deleted")
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
    getService,
    getServiceById,
    createService,
    updateService,
    deleteService
}