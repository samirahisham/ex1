
const sequelize = require("../settings/database/db_connection");

const {Sequelize} = require("sequelize");


exports.createObj = async (request, response) => {
    let transaction = await sequelize.transaction();
    try{
        let data = request.body || {};

    }
    catch (e) {
        transaction.rollback();
        console.log(e);
        response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
    }
}