const Joi = require('joi');

module.exports.userSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "Email must be a valid text value.",
            "string.empty": "Email cannot be empty.",
            "string.email": "Email must be a valid email address.",
            "any.required": "Email is required."
        }),

    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]+$'))
        .messages({
            "string.base": "Password must be a text value.",
            "string.empty": "Password cannot be empty.",
            "any.required": "Password is required.",
            "string.pattern.base": "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character."
        })
});