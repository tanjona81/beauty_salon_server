const uri = require("../../config/DbConfig.js");
const mongoose = require("mongoose");
const service = require("../../services/manager/ManagerServices.js");
const HttpStatus = require("http-status-codes");

const loginManager = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .login(req.body.nom, req.body.mdp)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: "Manager not found, incorrect login or password",
              details: result,
              http_response: {
                message: "No match for the request",
                code: 204,
              },
            };
            return res.status(HttpStatus.OK).json(responseData);
          }
          const responseData = {
            status: true,
            message: "Manager successfully connected",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getManager = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getAll()
        .then((result) => {
          const responseData = {
            status: true,
            message: "List manager",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getManagerById = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getById(req.params.id)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: `Manager with id ${req.params.id} not found`,
              details: null,
              http_response: {
                message: "No match for the request",
                code: 204,
              },
            };
            return res.status(HttpStatus.OK).json(responseData);
          }
          const responseData = {
            status: true,
            message: `Manager with id ${req.params.id}`,
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const createManager = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const { nom, mdp } = req.body;
      console.log(req.body);
      await service
        .create(nom, mdp)
        .then((result) => {
          const responseData = {
            status: true,
            message: "Manager successfully created",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const updateManager = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const { nom, mdp } = req.body;
      await service
        .update(req.params.id, nom, mdp)
        .then((result) => {
          const responseData = {
            status: true,
            message: `Manager successfully updated`,
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const deleteManager = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .delete_manager(req.params.id)
        .then((result) => {
          const responseData = {
            status: true,
            message: "Manager successfully deleted",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getTempsMoyenTravailPourChaqueEmpoye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getTempsMoyenTravailPourChaqueEmpoye()
        .then((result) => {
          const responseData = {
            status: true,
            message: `TempsMoyenTravailPourChaqueEmpoye`,
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getNbrRdv_jour = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .nbrReservation_jour()
        .then((result) => {
          const responseData = {
            status: true,
            message: "NbrRdv_jour",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getNbrRdv_mois = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .nbrReservation_mois()
        .then((result) => {
          const responseData = {
            status: true,
            message: "NbrRdv_mois",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
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
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(responseData);
        });
    } catch (e) {
      const responseData = {
        status: false,
        message: e,
        details: null,
        http_response: {
          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

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
};
