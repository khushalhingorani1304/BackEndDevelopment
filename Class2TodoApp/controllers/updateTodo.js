// Import the model
const Todo = require("../models/ToDo");

//Define Route Handler

exports.updateTodo = async (req, res) => {
  try {
    // Fetching id
    const {id} = req.params;
    const {title,description} = req.body;

    const todos = await Todo.findByIdAndUpdate(
        {_id:id},
        {title,description,updatedAt:Date.now()}
    )

    res.status(200).json({
        success: true,
        data: todos,
        message: `Updated Successfully`,
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
