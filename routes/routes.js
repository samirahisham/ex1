const { createObj } = require("../apis/crud");
const routes = app =>{
    app.use('/create',createObj )

}

module.exports = routes;
