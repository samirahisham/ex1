const isValidValue = (value) =>{
    return !["", null, undefined].includes(value)
}

module.exports = isValidValue