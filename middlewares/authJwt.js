const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const BlackToken = require('../schemas/Blacklist_tokenSchema.js')

const verifyToken = async (req, res, next) => {
  // Extraction du token JWT du header Authorization
  const authHeader = req.get("Authorization");

  // Vérification de la présence du header Authorization
  if (!authHeader) {
    const responseData = {
      status: false,
      message: "No token provided!",
      details: null,
      http_response: {
        message: "No token provided!",
        code: 403,
      },
    };
    return res.status(403).json(responseData);
  }

  // Extraction du token réel à partir du header Authorization
  // Le format est généralement "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  // Verify if the token is already blacklisted for revoking token purpose
  const blacklisted = await BlackToken.find({ token: token });
  if(blacklisted.length > 0){
    const responseData = {
      status: false,
      message: "Token expired",
      details: null,
      http_response: {
        message: "Token expired",
        code: 403,
      },
    };
    return res.status(403).json(responseData);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      const responseData = {
        status: false,
        message: "Unauthorized!",
        details: null,
        http_response: {
          message: "Unauthorized!",
          code: 401,
        },
      };
      return res.status(401).json(responseData);
    }
    req.user_id = decoded._id;
    req.role = decoded.role;
    next();
  });
};

const isManager = (req, res, next) => {
  if (req.role === "manager") {
    next();
    return;
  }

  const responseData = {
    status: false,
    message: "Require Manager Role!",
    details: null,
    http_response: {
      message: "Require Manager Role!",
      code: 403,
    },
  };
  return res.status(403).json(responseData);
};

const isManagerOrEmploye = (req, res, next) => {
  if (req.role === "manager" || req.role === "employe") {
    next();
    return;
  }

  const responseData = {
    status: false,
    message: "Require Manager or Employe Role!",
    details: null,
    http_response: {
      message: "Require Manager or Employe Role!",
      code: 403,
    },
  };
  return res.status(403).json(responseData);
};

const isEmploye = (req, res, next) => {
  if (req.role === "employe") {
    next();
    return;
  }

  const responseData = {
    status: false,
    message: "Require Employe Role!",
    details: null,
    http_response: {
      message: "Require Employe Role!",
      code: 403,
    },
  };
  return res.status(403).json(responseData);
};

const isCustomer = (req, res, next) => {
  if (req.role === "customer") {
    next();
    return;
  }

  const responseData = {
    status: false,
    message: "Require Customer Role!",
    details: null,
    http_response: {
      message: "Require Customer Role!",
      code: 403,
    },
  };
  return res.status(403).json(responseData);
};

const authJwt = {
  verifyToken,
  isManager,
  isEmploye,
  isCustomer,
  isManagerOrEmploye,
};
module.exports = authJwt;
