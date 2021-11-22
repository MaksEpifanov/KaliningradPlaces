const BaseJoi = require("joi");
const createError = require("http-errors");
const sanitizeHtml = require("sanitize-html");

const extansion = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extansion);

module.exports.validatePlace = (req, res, next) => {
  const placeValidateSchema = Joi.object({
    place: Joi.object({
      title: Joi.string().required().escapeHTML(),
      // img: Joi.string(),
      description: Joi.string().escapeHTML(),
      location: Joi.string().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
  });
  const { error } = placeValidateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new createError(400, msg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const reviewValidateSchema = Joi.object({
    review: Joi.object({
      body: Joi.string().required().escapeHTML(),
      rating: Joi.number().required().min(1).max(5),
    }).required(),
  });
  const { error } = reviewValidateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new createError(400, msg);
  } else {
    next();
  }
};
