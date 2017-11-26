
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const privateKey = '37LvDSm4XvjYOh9Y';

export const decrypt = (password) => {
  var decipher = crypto.createDecipher(algorithm, privateKey);
  var dec = decipher.update(password, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

export const encrypt = (password) => {
  var cipher = crypto.createCipher(algorithm, privateKey);
  var crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};