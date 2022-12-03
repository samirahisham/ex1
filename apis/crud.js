
const sequelize = require("../settings/database/db_connection");
const {Op} = require("sequelize");

const {Sequelize} = require("sequelize");
const CustomObject = require("../models/customObject");
const { saveInstance, updateInstance, deleteInstance } = require("./cud_instance");
const isValidValue = require("../core/is_valid_value");
const pagination = require("../core/pagination");


exports.createObj = async (request, response) => {
    let transaction = await sequelize.transaction();
    try{
        
        let data = request.body || {};
        console.log("DATAAAAAAA==>>",data);
        const obj = await saveInstance(null, CustomObject, data);
        return response.status(201).json(obj);
    }
    catch (e) {
        transaction.rollback();
        console.log(e);
        response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
    }
}

exports.listObj = async (request, response) => {
    try {

        const page = request.query.current_page || 1;
        const search = (request.query.search || "").trim();
        const item_per_page = request.query.item_per_page || 5;
        let deleted_type = request.query.deleted_type || false;
        
        if (isValidValue(deleted_type)){
            if (deleted_type==="true"){
                deleted_type=true
            }
            else{
                deleted_type=false
            }
        }
        let options = {
            order: [['createdAt', 'DESC']],
        }

        if (isValidValue(search)) {
            options['where'] = {
                [Op.or]: [
            
                    {title: {[Op.substring]: search}},
                    
                ],
                [Op.and]:[
                    {
                        isDeleted:deleted_type
                    }
                ]
            }
        }

        const pagination_result = await pagination(CustomObject, page, item_per_page, options);
        response.status(200).json(pagination_result);

    } catch (e) {
        console.log(e);
        response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
    }
}

exports.getCustomObj = async (request, response) => {
    try {

        const pk = request.params.pk || "";
        let options = {
            where: {id: pk,
                isDeleted: false
            },
            
        }


        const instance = await CustomObject.findOne(options);

        if (isValidValue(instance)) {
            response.status(200).json(instance);
        } else {
            response.status(404).json({non_field_errors: "CustomObj not found"});
        }
    } catch (e) {
        console.log(e);
        response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
    }
}


exports.deleteCustomObj = async (request, response) => {
try{
    const pk = request.params.pk || "";

    let options = {
        where: {id: pk}
    }
    let instance = await CustomObject.findOne(options);

    await deleteInstance(null, instance, {}, true)

    response.status(204).json({msg: "Deleted"});

}
catch (e) {
    console.log(e);
    response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
}
}

exports.softDeleteCustomObj = async (request, response) => {
    try{
        const pk = request.params.pk || "";
    
        let options = {
            where: {id: pk}
        }
        let instance = await CustomObject.findOne(options);
    
        await deleteInstance(null, instance, {}, false)
    
        response.status(204).json({msg: "Deleted"});
    
    }
    catch (e) {
        console.log(e);
        response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
    }
    }


exports.updateCustomObj = async (request, response) => {
    try {
        let pk = request.params.pk || "";
        let data = request.body || {};
        data.id = pk;


        let options = {
            where: {id: pk || "", isDeleted: false}
        }

        let instance = await CustomObject.findOne(options);
        if (!isValidValue(instance)) {
            response.status(404).json({non_field_errors: "CustomObject not found"});
            return;
        }

        const new_obj = await updateInstance(null, instance, data,);

        return response.status(200).json(new_obj);
    } catch (e) {
        console.log(e);
        response.status(400).json({'fatal_error': true, non_field_errors: "Opps, something went wrong"});
    }

}
