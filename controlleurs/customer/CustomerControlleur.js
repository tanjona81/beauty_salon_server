const service = require("../../services/customer/CustomerServices.js");
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

const loginCustomer = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .login(req.body.email, req.body.mdp)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: "Customer not found, incorrect login or password",
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
            message: "Customer successfully connected",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
        })
        .catch((error) => {
          const responseData = {
            status: false,
            message: error,
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

const getCustomer = () => {
  return async (req, res) => {
    try {
      await service
        .getAll()
        .then((result) => {
          const responseData = {
            status: true,
            message: "List customer",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
        })
        .catch((error) => {
          const responseData = {
            status: false,
            message: error,
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
    }
  };
};

const getCustomerById = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getById(req.params.id)
        .then((result) => {
          if (!result) {
            const responseData = {
              status: false,
              message: `No match for the request with id ${req.params.id}`,
              details: result,
              http_response: {
                message: HttpStatus.getStatusText(HttpStatus.NO_CONTENT),
                code: HttpStatus.OK,
              },
            };
            return res.status(HttpStatus.NO_CONTENT).json(responseData);
          }
          const responseData = {
            status: true,
            message: `Customer with id ${req.params.id}`,
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
        })
        .catch((error) => {
          const responseData = {
            status: false,
            message: error,
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

const createCustomer = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const { image, nom, prenom, tel, email, addresse, mdp } = req.body;
      await service
        .create(image, nom, prenom, tel, email, addresse, mdp)
        .then((result) => {
          const usertoken = {
            _id: result._id,
            nom: result.nom,
            role: "customer",
          };
          const accessToken = jwt.sign(usertoken, config.secret);
          const responseData = {
            status: true,
            message: "Customer successfully created",
            details: {
              customer: result,
              token: accessToken,
            },
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
        })
        .catch((error) => {
          const responseData = {
            status: false,
            message: error,
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

const updateCustomer = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const { image, nom, prenom, tel, email, addresse, mdp } = req.body;
      await service
        .update(req.user_id, image, nom, prenom, tel, email, addresse, mdp)
        .then((result) => {
          const responseData = {
            status: true,
            message: "Customer successfully updated",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(HttpStatus.OK).json(responseData);
        })
        .catch((error) => {
          const responseData = {
            status: false,
            message: error,
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

const deleteCustomer = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .delete_customer(req.params.id)
        .then((result) => {
          const responseData = {
            status: true,
            message: "Customer successfully deleted",
            details: null,
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

const payment = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      const { id_rendezvous } = req.body;
      await service
        .payment(id_rendezvous)
        .then((result) => {
          // if (!result) return res.status(204).send("No match for the request");
          const responseData = {
            status: true,
            message: "Rendezvous paid successfuly",
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
          console.log("Error : " + err.message);
          return res.status(500).json(responseData);
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
      console.log("Error : " + e.message);
      // await mongoose.disconnect()
      return res.status(500).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getHistoryRendezvous = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getHistoryRendezvous(req.user_id)
        .then((result) => {
          // if (!result) return res.status(204).send("No match for the request");
          const responseData = {
            status: true,
            message: "Rendezvous history",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(result);
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
          console.log("Error : " + err.message);
          return res.status(500).json(responseData);
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
      console.log("Error : " + e.message);
      // await mongoose.disconnect()
      return res.status(500).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

const getNotPaid = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getNotPaid(req.user_id)
        .then((result) => {
          // if (!result) return res.status(204).send("No match for the request");
          const responseData = {
            status: true,
            message: "Rendezvous history",
            details: result,
            http_response: {
              message: HttpStatus.getStatusText(HttpStatus.OK),
              code: HttpStatus.OK,
            },
          };
          return res.status(200).json(result);
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
          console.log("Error : " + err.message);
          return res.status(500).json(responseData);
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
      console.log("Error : " + e.message);
      // await mongoose.disconnect()
      return res.status(500).json(responseData);
    } finally {
      // await mongoose.disconnect()
    }
  };
};

module.exports = {
  getCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
  payment,
  getHistoryRendezvous,
  getNotPaid,
};
