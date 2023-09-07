const Plant = require("../models/plant");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllPlants = async (req, res) => {
    const plants = await Plant.find({ createdBy: req.user.userId }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json({
        plants,
        count: plants.length,
        user: req.user.name,
    });
};
const getPlant = async (req, res) => {
    const {
        user: { userId },
        params: { id: plantId },
    } = req;

    const plant = await Plant.findOne({
        _id: plantId,
        createdBy: userId,
    });
    if (!job) {
        throw new NotFoundError(`No plant with id ${plantId}`);
    }
    res.status(StatusCodes.OK).json({ plant });
};

const createPlant = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const plant = await Plant.create(req.body);
    res.status(StatusCodes.CREATED).json({ plant });
};

const updatePlant = async (req, res) => {
    const {
        body: { plantName, plantNickName, plantFamily, light, water, image },
        user: { userId },
        params: { id: plantId },
    } = req;

    if (plantName === "" || light === "" || water === "" || image === "") {
        throw new BadRequestError("All fields must be filed");
    }
    const plant = await Plant.findByIdAndUpdate(
        { _id: plantId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!plant) {
        throw new NotFoundError(`No plant with id ${plantId}`);
    }
    res.status(StatusCodes.OK).json({ plant });
};

const deletePlant = async (req, res) => {
    const {
        user: { userId },
        params: { id: plantId },
    } = req;

    const plant = await Plant.findByIdAndRemove({
        _id: plantId,
        createdBy: userId,
    });
    if (!plant) {
        throw new NotFoundError(`No job with id ${joplantIdbId}`);
    }
    res.status(StatusCodes.OK).send({ plant });
};

module.exports = {
    createPlant,
    deletePlant,
    getAllPlants,
    updatePlant,
    getPlant,
};
