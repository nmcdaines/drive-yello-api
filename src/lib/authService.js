import jwt from 'jsonwebtoken';
import { validatePassword } from '../routes/auth/service';
import { resultTemplate } from "./resultTemplate";

export const generateToken = async ({username, password}) => {
  const result = await validatePassword({username, password});

  if (result.errorCount > 0) return result;

  const payload = {
    username: result.data.username,
  };

  result.data = jwt.sign(payload, process.env.secret || "helloWorld");

  result.message = "Token successfully generated";

  return result;
};

export const authenticationMiddleware = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.secret || "helloWorld", function (err, decoded) {
      if (err) {
        const result = resultTemplate();
        result.errors.push("Unable to authenticate");
        result.errorCount += 1;
        return res.send(result);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    const result = resultTemplate();
    result.errors.push("No token provided");
    result.errorCount += 1;
    return res.status(403).send(result);
  }
};