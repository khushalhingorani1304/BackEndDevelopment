// Import the model
const Todo = require("../models/ToDo");

//Define Route Handler
exports.getTodo = async (req, res) => {
  try {
    //* Fetch all TODO items from database
    const todos = await Todo.find({});

    // Response
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todo Data is fetched",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Sever Error",
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    // Extract Todo items based on ID
    const id = req.params.id;
    const todos = await Todo.findById({ _id: id });

    // If data for given Id not found
    if (!todos) {
      return res.status(404).json({
        success: false,
        message: "No data Found with given Id",
      });
    }

    // if data for given id found
    res.status(200).json({
      success: true,
      data: todos,
      message: `Todo ${id} data successfully fetched`,
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        error: err.message,
        message: "Internal Sever Error",
    });
  }
};
