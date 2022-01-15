import API from '../models/apiModel.js';
import asyncHandler from 'express-async-handler';

export const getApiEndpoints = asyncHandler(async(req,res) => {
    const apis = await API.find({})
    res.status(200).json({
        message:"API endpoints fetched successfully!",
        apis
    })
})

export const addApi = asyncHandler(async(req,res) => {
    const { method, route, parameters, access, description } = req.body
    const findApi = await API.findOne({ route })
    if(findApi){
        res.status(400).json({
            message:"API endpoint already exists"
        })
    }
    else{
        const api = await API.create({
            method,route, parameters, access, description
        })
        if(api){
            res.status(201).json({
                message:"Api endpoint created successfully",  
            })
        }
        else{
            res.status(400).json({
                message:"Invalid API data"
            })
        }
    }
})

export const editApi = asyncHandler(async(req,res) => {
    const { method, route, parameters, access, description } = req.body
    const api = await API.findOne({ route })
    if(api){
        api.method = method || api.method
        api.parameters = parameters || api.parameters
        api.access = access || api.access
        api.description = description || api.description
        const updatedApi = await api.save()
        if(updatedApi){
            res.status(200).json({
                message:"Api updated successfully!"
            })
        }
    }
    else{
        res.status(404).json({
            message:"No API found with that route"
        })
    }
})

export const deleteApi = asyncHandler(async(req,res) => {
    const { id } = req.params
    const api = await API.findById(id)
    if(api){
        await api.remove()
        res.status(204).json({ message:"API deleted successfully" })
    } 
    else{
        res.status(404).json({
            message:"No API found"
        })
    }
})