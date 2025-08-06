const bcrypt = require("bcrypt")

module.exports.HASHEDPASSWORD = async (plainpassword) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainpassword, salt);

}
module.exports.COMPAREPASSWORD = async (plainpassword, hashedpassword) => {
    return await bcrypt.compare(plainpassword, hashedpassword);
}

