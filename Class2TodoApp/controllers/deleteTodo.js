// Import the model
const Todo = require("../models/ToDo");

//Define Route Handler
exports.deleteTodo = async (req, res) => {
  try {
    // Fetching id
    const {id} = req.params;

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: `Deleted Successfully`,
      });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
        success: false,
        error: err.message,
        message: "Server Error",
      });
  }
};
