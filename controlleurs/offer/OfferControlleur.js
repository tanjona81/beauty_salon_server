const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/offer/OfferServices.js')

const getOffer = () => {
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

const getOfferById = () => {
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

const createOffer = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {id_customer, id_service, reduction, date_heure_fin} = req.body;
            await service.create(id_customer, id_service, reduction, date_heure_fin)
            .then((result)=>{
                return res.status(201).json(result)
            })
            .catch((err) => {
                if (err instanceof mongoose.Error.ValidationError) {
                    // Handle validation errors
                    console.error('Validation error:', err.message);
                    return res.status(400).json({ error: 'Validation error', message: err.message });
                }
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

const updateOffer = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {id_customer, id_service, reduction, date_heure_fin} = req.body;
            await service.update(req.params.id, id_customer, id_service, reduction, date_heure_fin)
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

const deleteOffer = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.delete_offer(req.params.id)
            .then((result)=>{
                return res.status(204).json("Offer deleted")
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
    getOffer,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer
}