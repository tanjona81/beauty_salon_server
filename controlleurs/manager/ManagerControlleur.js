// const db = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/manager/ManagerServices.js')
const express = require('express');

const getManager = () => {
    return(async (req,res)=>{
        try{
            service.getAll()
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                // console.log(result.length);
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }finally{
        }
    })
}

const getManagerById = () => {
    return(async (req,res)=>{
        try{
            service.getById(req.params.id)
            .then((result)=>{
                // if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(204).send('No match for the request')
                if(!result) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }finally{
            // client.release()
        }
    })
}

const createManager = () => {
    return (async (req,res)=>{
        // const session = await mongoose.startSession()
        // session.startTransaction()
        try{
            const {nom,mdp} = req.body;
            service.create(nom, mdp)
            .then((result)=>{
                // session.commitTransaction().then(()=>{
                    return res.status(201).json("Manager saved")
                // })
            })
            .catch((err) => {
                // session.abortTransaction().then(()=>{
                    console.log("Error : "+err.message)
                    return res.status(500).send('Internal server error')
                // })
                
            });
        }finally{
            // session.endSession();
        }
    })
}

const updateManager = () => {
    return (async (req,res)=>{
        // const session = mongoose.startSession()
        // await session.startTransaction()
        try{
            const {nom,mdp} = req.body;
            service.update(nom, mdp)
            .then((result)=>{
                // session.commitTransaction().then(()=>{
                    return res.status(201).json("Manager updated")
                // })
            })
            .catch((err) => {
                // session.abortTransaction().then(()=>{
                    console.log("Error : "+err.message)
                    return res.status(500).send('Internal server error')
                // })
                
            });
        }finally{
            // session.endSession();
        }
    })
}

const deleteManager = () => {
    return (async (req,res)=>{
        // const session = mongoose.startSession()
        // await session.startTransaction()
        try{
            service.delete_manager(req.params.id)
            .then((result)=>{
                // session.commitTransaction().then(()=>{
                    return res.status(201).json("Manager updated")
                // })
            })
            .catch((err) => {
                // session.abortTransaction().then(()=>{
                    console.log("Error : "+err.message)
                    return res.status(500).send('Internal server error')
                // })
                
            });
        }finally{
            // session.endSession();
        }
    })
}

module.exports = {
    getManager,
    getManagerById,
    createManager,
    updateManager,
    deleteManager
}