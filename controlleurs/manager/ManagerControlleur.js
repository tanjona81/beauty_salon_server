const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/manager/ManagerServices.js')
const express = require('express');

const getManager = () => {
    return(async (req,res)=>{
        try{
            await mongoose.connect(uri)
            await service.getAll()
            .then((result)=>{
                if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }finally{
            await mongoose.disconnect()
        }
    })
}

const getManagerById = () => {
    return(async (req,res)=>{
        try{
            await mongoose.connect(uri)
            await service.getById(req.params.id)
            .then((result)=>{
                if(!result) return res.status(204).send('No match for the request')
                return res.status(200).json(result)
                
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }finally{
            await mongoose.disconnect()
        }
    })
}

const createManager = () => {
    return (async (req,res)=>{
        try{
            await mongoose.connect(uri)
            const {nom,mdp} = req.body;
            await service.create(nom, mdp)
            .then((result)=>{
                return res.status(201).json("Manager saved")
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')                
            });
        }finally{
            await mongoose.disconnect()
        }
    })
}

const updateManager = () => {
    return (async (req,res)=>{
        try{
            await mongoose.connect(uri)
            const {nom,mdp} = req.body;
            await service.update(req.params.id, nom, mdp)
            .then((result)=>{
                return res.status(200).json("Manager updated")
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')
            });
        }finally{
            await mongoose.disconnect()
        }
    })
}

const deleteManager = () => {
    return (async (req,res)=>{
        try{
            await mongoose.connect(uri)
            await service.delete_manager(req.params.id)
            .then((result)=>{
                return res.status(200).json("Manager updated")
            })
            .catch((err) => {
                console.log("Error : "+err.message)
                return res.status(500).send('Internal server error')                
            });
        }finally{
            await mongoose.disconnect()
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