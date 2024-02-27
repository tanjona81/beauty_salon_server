const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/preference/PreferenceServices.js')
const HttpStatus = require("http-status-codes");

const getPreference = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.getAll()
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "list of preferences",
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                // if(result.length<=0) return res.status(204).send('No match for the request')
                return res.status(200).json(responseData)
                
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getPreferenceById = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.getById(req.params.id)
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: `Preference id ${req.params.id}`,
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                if(!result) {
                    const responseData = {
                        status: false,
                        message: `No match for the request with id ${req.params.id}`,
                        details: result,
                        http_response: {
                          message: HttpStatus.getStatusText(HttpStatus.NO_CONTENT),
                          code: HttpStatus.OK,
                        },
                      };
                    return res.status(204).json(responseData)
                }
                return res.status(200).json(responseData)
                
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const createPreference = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {id_prefere, designation} = req.body;
            await service.create(req.user_id, id_prefere, designation)
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "Preference created successfully",
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                return res.status(201).json(result)
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)                
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const updatePreference = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            const {id_customer, id_prefere, designation} = req.body;
            await service.update(req.params.id, id_customer, id_prefere, designation)
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "Preference updated successfully",
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                return res.status(200).json(result)
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const deletePreference = () => {
    return (async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.delete_preference(req.params.id)
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "Preference deleted successfully",
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                return res.status(200).json(responseData)
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)                
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getPreferenceEmploye = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.employe_prefere(req.user_id)
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "List of employed prefered",
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                // if(!result) return res.status(204).send('No match for the request')
                return res.status(200).json(responseData)
                
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getPreferenceService = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.service_prefere(req.user_id)
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "List of services prefered",
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                // if(!result) return res.status(204).send('No match for the request')
                return res.status(200).json(responseData)
                
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(
                        HttpStatus.INTERNAL_SERVER_ERROR
                      ),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).json(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(
                    HttpStatus.INTERNAL_SERVER_ERROR
                  ),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).json(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getAllServicePlusPreference = () => {
  return(async (req,res)=>{
      try{
          // await mongoose.connect(uri)
          await service.all_service_plus_prefere(req.user_id)
          .then((result)=>{
              const responseData = {
                  status: true,
                  message: "List of services prefered",
                  details: result,
                  http_response: {
                    message: HttpStatus.getStatusText(HttpStatus.OK),
                    code: HttpStatus.OK,
                  },
                };
              // if(!result) return res.status(204).send('No match for the request')
              return res.status(200).json(responseData)
              
          })
          .catch((err) => {
              const responseData = {
                  status: false,
                  message: err,
                  details: null,
                  http_response: {
                    message: HttpStatus.getStatusText(
                      HttpStatus.INTERNAL_SERVER_ERROR
                    ),
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                  },
                };
              console.log("Error : "+err.message)
              return res.status(500).json(responseData)
          });
      }catch(e){
          const responseData = {
              status: false,
              message: e,
              details: null,
              http_response: {
                message: HttpStatus.getStatusText(
                  HttpStatus.INTERNAL_SERVER_ERROR
                ),
                code: HttpStatus.INTERNAL_SERVER_ERROR,
              },
            };
          console.log("Error : "+e.message)
          // await mongoose.disconnect()
          return res.status(500).json(responseData)
      }finally{
          // await mongoose.disconnect()
      }
  })
}

module.exports = {
    getPreference,
    getPreferenceById,
    createPreference,
    updatePreference,
    deletePreference,
    getPreferenceEmploye,
    getPreferenceService,
    getAllServicePlusPreference
}