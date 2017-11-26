import User, {validate} from './schema';
import { encrypt, decrypt } from '../../lib/crypt';
import { resultTemplate } from '../../lib/resultTemplate';

export const findUser = async ({username}) => {
  let user = await User.find({username}).exec();
  return Object.assign({}, resultTemplate(), {data:user});
};

export const createUser = async ({username, password}) => {

  const result = resultTemplate();

  // 1. Validate the user object
  let validationResults = validate({username, password});
  if (validationResults.errorCount > 0) return validationResults;

  // 2. Check to see if username exists
  let user = await User.find({username}).exec();
  if (user.length > 0) {
    result.errors.push("Username already exists");
    result.errorCount += 1;
    return result;
  }

  // 3. If successful save new user
  let savedUser = await User.create({username, password: encrypt(password)});
  result.data = {
    _id: savedUser._id,
    username: savedUser.username,
  };

  return result;
};

export const updateUser = async ({username, password}) => {

};

export const validatePassword = async ({username, password}) => {
  const result = resultTemplate();

  const user = await User.find({username}).exec();

  if (user.length == 0 || password !== decrypt(user[0].password)) {
    result.errors.push("User not found OR Password incorrect");
    result.errorCount += 1;
    return result;
  };

  result.data = {
    _id: user[0]._id,
    username: user[0].username,
  };

  return result;
};