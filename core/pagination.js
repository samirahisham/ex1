const isValidValue = require("./is_valid_value");


module.exports = async (Model, page=1, item_per_page=10, options={}) =>{
    try{
        page = parseInt(page);
        if (isNaN(page)){
            page = 1;
        }
    }catch (e) {
        page = 1;
    }

    try{
        item_per_page = parseInt(item_per_page);
        if (isNaN(item_per_page)){
            item_per_page = 10;
        }
    }catch (e) {
        item_per_page = 10;
    }

    if (page < 1){
        page = 1
    }
    if (item_per_page < 1){
        item_per_page = 1
    }


    const {count, rows} = await Model.findAndCountAll({
        offset: item_per_page * (page - 1),
        limit: item_per_page,
        distinct: true,
        col: 'id',
        ...options
    });
    const total = isValidValue(options.group)?count.length:count;

    return {
        data: rows,
        current_page: page,
        has_next_page: item_per_page * page < total,
        item_per_page: item_per_page,
        has_previous_page: page > 1,
        next_page: page + 1,
        previous_page: Math.max(1, page - 1),
        last_page: Math.max(1, Math.ceil(total / item_per_page)),
        total: total
    }
}
