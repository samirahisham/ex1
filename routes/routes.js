const ObjUrls = require('../apis/obj_urls');

const routes = app =>{
    app.use('/api',ObjUrls )
}

module.exports = routes;
