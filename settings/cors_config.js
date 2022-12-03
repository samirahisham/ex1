
const corsConfig = async (request, response, next) =>{

    // let allowedOrigins = process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(",");
    // let origin = request.headers.origin || "";
    //
    // if (allowedOrigins.includes(origin) || process.env.ACCESS_CONTROL_ALLOW_ORIGIN === "*") {
    //     response.setHeader("Access-Control-Allow-Origin", origin);
    // }
    response.setHeader('Access-Control-Allow-Origin', "*");

    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, content-type, Authorization');

    next();
}


module.exports = corsConfig;
