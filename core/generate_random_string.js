const getRandomInt = require('../core/get_random_int');
const isValidValue = require("./is_valid_value");

const generateRandomString = (length, from_code=65, to_code=90, regex="") =>{
    let value = "";
    for (let i = 0; value.length < length; i++) {
        const chr_code = getRandomInt(from_code, to_code)
        const chr_value = String.fromCharCode(chr_code);
        regex = new RegExp(regex);
        if (isValidValue(regex) && !regex.test(chr_value))continue;
        value += chr_value
    }
    return value
}



module.exports = generateRandomString;

