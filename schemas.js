const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.plantSchema = Joi.object({
    plant: Joi.object({
        name: Joi.string().required().escapeHTML(),
        date: Joi.date().required(),
        family: Joi.string().required().escapeHTML(),
        water: Joi.string().required().escapeHTML(),
        notes: Joi.string().allow(null, '').escapeHTML(),
        images: Joi.string().allow(null, '')
    }).required(),
    deleteImages: Joi.array()

});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required().escapeHTML()
    }).required()
});


module.exports.journalSchema = Joi.object({
    journal: Joi.object({
        body: Joi.string().required().escapeHTML()
    }).required()
})