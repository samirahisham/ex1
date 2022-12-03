const {v4: uuid4} = require('uuid');

exports.saveInstance = async (user, InstanceModel, data, options={})=>{
    delete data['id'];

    const user_id = (user || {}).id || "";

    const instance = await InstanceModel.create({
        ...data,
        createdBy: user_id,
        modifiedBy: user_id,
        deletedAt: null,
        deletedBy: null,
        is_deleted: false,
    }, options)

    return instance
}



exports.updateInstance = async (user, instance, data, read_only_fields=[], options={})=>{
        read_only_fields.concat(['id', 'createdBy', 'modifiedBy', 'deletedAt', 'deletedBy', 'is_deleted']);

        Object.keys(data).map(Key=>{
            if (Key !== "id" && !read_only_fields.includes(Key)){
                instance[Key] = data[Key];
            }
        })

        instance.modifiedBy = user.id;
        instance.deletedAt = null;
        instance.deletedBy = null;
        instance.is_deleted = false;

        await instance.save(options);

    return instance
}


exports.deleteInstance = async (user, instance, options={}, permanent_delete=false)=>{
    const id = instance.id;
    options = {...options, user}

    if (permanent_delete) {
        instance.destroy(options);
    } else {
        instance.deletedAt = new Date();
        instance.deletedBy = user.id;
        instance.is_deleted = true;
        await instance.save(options);
    }

    return id
}

