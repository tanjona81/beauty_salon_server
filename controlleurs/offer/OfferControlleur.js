const uri = require('../../config/DbConfig.js')
const mongoose = require('mongoose');
const service = require('../../services/offer/OfferServices.js')
const HttpStatus = require("http-status-codes");

const getOffer = () => {
    return(async (req,res)=>{
        try{
            // await mongoose.connect(uri)
            await service.getAll()
            .then((result)=>{
                const responseData = {
                    status: true,
                    message: "List offer",
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
                    message: err.message,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).send(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e.message,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send(responseData)
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
                const responseData = {
                    status: true,
                    message: `Customer with id ${req.params.id}`,
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
                          code: HttpStatus.NO_CONTENT,
                        },
                      };
                    return res.status(204).send(responseData)
                }
                return res.status(200).json(responseData)
                
            })
            .catch((err) => {
                const responseData = {
                    status: false,
                    message: err.message,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).send(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e.message,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send(responseData)
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
                const responseData = {
                    status: true,
                    message: "Offer created successfully",
                    details: result,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.OK),
                      code: HttpStatus.OK,
                    },
                  };
                return res.status(201).json(responseData)
            })
            .catch((err) => {
                if (err instanceof mongoose.Error.ValidationError) {
                    const responseData = {
                        status: false,
                        message: err.message,
                        details: null,
                        http_response: {
                          message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
                          code: HttpStatus.BAD_REQUEST,
                        },
                      };
                    // Handle validation errors
                    console.error('Validation error:', err.message);
                    return res.status(400).json(responseData);
                }
                const responseData = {
                    status: false,
                    message: err.message,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).send(responseData)                
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e.message,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send(responseData)
            
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
                const responseData = {
                    status: true,
                    message: "Offer updated successfully",
                    details: result,
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
                    message: err.message,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).send(responseData)
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e.message,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send(responseData)
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
                const responseData = {
                    status: true,
                    message: "Offer deleted successfully",
                    details: result,
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
                    message: err.message,
                    details: null,
                    http_response: {
                      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                      code: HttpStatus.INTERNAL_SERVER_ERROR,
                    },
                  };
                console.log("Error : "+err.message)
                return res.status(500).send(responseData)                
            });
        }catch(e){
            const responseData = {
                status: false,
                message: e.message,
                details: null,
                http_response: {
                  message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                },
              };
            console.log("Error : "+e.message)
            // await mongoose.disconnect()
            return res.status(500).send(responseData)
        }finally{
            // await mongoose.disconnect()
        }
    })
}

const getOfferUpToDate = () => {
  return(async (req,res)=>{
      try{
          // await mongoose.connect(uri)
          await service.getAllOffreUptoDate()
          .then((result)=>{
              const responseData = {
                  status: true,
                  message: "List offer up to date",
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
                  message: err.message,
                  details: null,
                  http_response: {
                    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                  },
                };
              console.log("Error : "+err.message)
              return res.status(500).send(responseData)
          });
      }catch(e){
          const responseData = {
              status: false,
              message: e.message,
              details: null,
              http_response: {
                message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                code: HttpStatus.INTERNAL_SERVER_ERROR,
              },
            };
          console.log("Error : "+e.message)
          // await mongoose.disconnect()
          return res.status(500).send(responseData)
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
    deleteOffer,
    getOfferUpToDate
}