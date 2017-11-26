import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const userSchema = new Schema({
  username: String,             // 25 English Characters [a-zA-Z]
  password: String,
  admin: Boolean,
});


// Validate User Object
export const validate = ({ username, password }) => {

  const result = {
    errors: [],
    errorCount: 0,
  };

  // Username
  if (typeof username === 'undefined') {
    result.errors.push("No username supplied");
    result.errorCount += 1;
  }

  if (/^[a-zA-Z0-9]{0,25}$/.test(username) === false) {
    result.errors.push("Username has invalid characters");
    result.errorCount += 1;
  }

  // Password

  if (typeof password === 'undefined') {
    result.errors.push("No password supplied");
    result.errorCount += 1;
  }

  if (/^[a-zA-Z0-9]{0,25}$/.test(password) === false) {
    result.errors.push("Password has invalid characters");
    result.errorCount += 1;
  }

  return result;
};

export default mongoose.model('User', userSchema);