const regex = {
  digits: "(\\d.*)",
  letters: "([a-zA-Z].*)",
  symbols:
    "([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\{\\}\\]\\\\|;:\\'\",<.>\\/\\?€£¥₹§±].*)",
  spaces: "([\\s].*)",
};

const checkStringAgainstRegex = (str) => {
  const results = {};

  for (const [key, pattern] of Object.entries(regex)) {
    const regExp = new RegExp(pattern);
    results[key] = regExp.test(str);
  }

  return results;
};

const validateLength = (str, length) => {
  if (str.length < length) return false;
  return true;
};

const validatePassword = (req, res, next) => {
  const password = req.password;

  if (validateLength(password, process.env.PASSWORD_LENGTH || 10)) {
    return res.status(403).json({
      error:
        "Password length is less than required " + process.env.PASSWORD_LENGTH,
    });
  }

  const passwordCorrectness = checkStringAgainstRegex(password);

  for (const [key, result] of Object.entries(passwordCorrectness)) {
    if (result === false) {
      return res.status(403).json({ error: key });
    }
  }

  next();
};

export default validatePassword;
