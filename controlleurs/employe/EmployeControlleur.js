const uri = require("../../config/DbConfig.js");
const mongoose = require("mongoose");
const service = require("../../services/employe/EmployeServices.js");
const HttpStatus = require("http-status-codes");

const loginEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .login(req.body.email, req.body.mdp)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: "Employe not found, incorrect login or password",
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
            message: "Employe successfully connected",
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

const getEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getAll()
        .then((result) => {
          const responseData = {
            status: true,
            message: "List Employe",
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

const getEmployeById = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getById(req.params.id)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: `Employe with id ${req.params.id} not found`,
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
            message: "Employe found",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(responseData);
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

const createEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const {
        image,
        nom,
        prenom,
        sexe,
        tel,
        email,
        addresse,
        mdp,
        heure_debut,
        heure_fin,
      } = req.body;
      await service
        .create(
          image,
          nom,
          prenom,
          sexe,
          tel,
          email,
          addresse,
          mdp,
          heure_debut,
          heure_fin
        )
        .then((result) => {
          const responseData = {
            status: true,
            message: "Employe created successfuly",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(responseData);
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

const updateEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const {
        image,
        nom,
        prenom,
        sexe,
        tel,
        email,
        addresse,
        mdp,
        heure_debut,
        heure_fin,
        is_activated
      } = req.body;
      await service
        .update(
          req.params.id,
          image,
          nom,
          prenom,
          sexe,
          tel,
          email,
          addresse,
          mdp,
          heure_debut,
          heure_fin,
          is_activated
        )
        .then((result) => {
          const responseData = {
            status: true,
            message: "Employe updated successfuly",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(responseData);
        })
        .catch((err) => {
          const responseData = {
            status: false,
            message: err.message,
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
        message: e.message,
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

const deleteEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .delete_employe(req.params.id)
        .then((result) => {
          const responseData = {
            status: true,
            message: "Employe deleted successfuly",
            details: null,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(204).json(responseData);
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

const getRendezvousEmploye = () => {
  return async (req, res) => {
    try {
      await service
        .getRendezvous(req.user_id)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: `RendezvousEmploye with id ${req.params.id} not found`,
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
            message: "List rendezvous for this employe",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(responseData);
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

const getDoneRendezvousEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getDoneRendezvous(req.user_id)
        .then((result) => {
          const responseData = {
            status: true,
            message: `DoneRendezvousEmploye with id ${req.params.id}`,
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

const validate_rendezvous = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .validate_rendezvous(req.params.id)
        .then((result) => {
          if (result.length <= 0){
            const responseData = {
              status: false,
              message: "No match for the request for this id",
              details: null,
              http_response: {
                message: HttpStatus.getStatusText(HttpStatus.NO_CONTENT),
                code: HttpStatus.OK,
              },
            };
            return res.status(200).json(responseData);
          }
          const responseData = {
            status: true,
            message: "Rdv Validated",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(responseData);
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

const getCommission = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .commission_per_day(req.user_id)
        .then((result) => {
          const responseData = {
            status: true,
            message: `Commission with id ${req.params.id}`,
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

const acceptRdvNoEmploye = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const { id_rendezvous } = req.body;
      await service
        .accept_rendezvous_no_employe(id_rendezvous, req.user_id)
        .then((result) => {
          const responseData = {
            status: true,
            message: `Rendezvous accepte avec succes`,
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

const getAllActif = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getAllActif()
        .then((result) => {
          const responseData = {
            status: true,
            message: `List all activated employe`,
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

const getRdvAssigne = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getRendezvousAssigne(req.user_id)
        .then((result) => {
          const responseData = {
            status: true,
            message: `List rdv assigne`,
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

const getRdvAssigneUpToDate = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getRendezvousAssigneUpToDate(req.user_id)
        .then((result) => {
          const responseData = {
            status: true,
            message: `List rdv assigne up to date`,
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
            message: err.message,
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
        message: e.message,
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
  getEmploye,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  loginEmploye,
  getRendezvousEmploye,
  getDoneRendezvousEmploye,
  validate_rendezvous,
  getCommission,
  acceptRdvNoEmploye,
  getAllActif,
  getRdvAssigne,
  getRdvAssigneUpToDate
};
