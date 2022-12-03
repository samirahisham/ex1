
const sequelize = require('../settings/database/db_connection');

const CustomObject = sequelize.define('CustomObject', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        noUpdate : true
    },


    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'title field is required'
            }
        }
    },



    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'date field is required'
            }
        }
    },


    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

});



module.exports = CustomObject;
