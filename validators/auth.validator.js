const Joi = require("joi");
const express = require("express");

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
});

module.exports = {
    loginSchema,
    registerSchema,
    refreshTokenSchema
};