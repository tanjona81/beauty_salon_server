const service = require("../../services/Blacklist_token/Blacklist_tokenServices.js");
const HttpStatus = require("http-status-codes");

const createBlacklist_token = () => {
    return async (req, res) => {
      try {
        // await mongoose.connect(uri)
        const { token } = req.body;
        await service
          .create(token)
          .then((result) => {
            const responseData = {
              status: true,
              message: "token revoked",
              details: null,
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

const verifyBlacklist_token = () => {
  return async (req, res) => {
    try {
      // await mongoose.connect(uri)
      await service
        .getByToken(req.param.token)
        .then((result) => {
          rep = true
          if(!result) rep = false;
          const responseData = {
            status: true,
            message: "token revoked",
            details: rep,
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

module.exports = {
    createBlacklist_token,
    verifyBlacklist_token
};