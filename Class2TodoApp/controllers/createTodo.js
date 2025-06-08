// Import the model
const Todo = require("../models/ToDo");

//Define Route Handler

exports.createTodo = async (req, res) => {
  try {
    // Extract title and description from request Body
    //* DATA FETCHING
    const { title, description } = req.body;

    // Create a new Todo obj and insert in DB
    //* DATA INSERTING
    const response = await Todo.create({ title, description });

    // Send a json response with a Success Flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully!!!",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal server failure",
      message: err.message,
    });
  }
};
