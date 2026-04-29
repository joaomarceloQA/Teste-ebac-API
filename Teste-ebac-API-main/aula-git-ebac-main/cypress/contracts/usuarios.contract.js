import Joi from 'joi'

const usuariosSchema = Joi.object({
    quantidade: Joi.number().required(),
    usuarios: Joi.array().items({
        nome: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required(),
        administrador: Joi.string().required(),
        _id: Joi.string().required()
    })
})

export default usuariosSchema;