const createError = require("http-errors");
const mongoose = require("mongoose");

export const findWithId = async (id: string, Model: any, options = {}) => {
  try {
    const item = await Model.findById(id, options);
    if (!item) {
      throw createError(404, `${Model.modelName} item not found with this id`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid item id");
    }
    throw error;
  }
};
