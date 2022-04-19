const Todo = require("../models/Todo");
const Todoelement = require("../models/Todoelement");

const TodoController = () => {
  const getTodoListByUser = async (req, res) => {
    const { query } = req;
    try {
      let todo = await Todo.findOne({ where: { userid: query.userid } });
      const todoelements = await Todoelement.findAll({
        where: { todoid: todo.id },
      });
      todo = { ...todo.dataValues, list: todoelements };
      res.status(200).json(todo);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };
  const getTodoByUser = async (req, res) => {
    const { query } = req;
    try {
      const todo = await Todo.findOne({ where: { userid: query.userid } });

      res.status(200).json(todo);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  const addtodoElement = async (req, res) => {
    const { body } = req;
    try {
      const todo = await Todo.findOne({ where: { userid: body.userid } });

      const todoelement = await Todoelement.create({
        name: body.name,
        deadline: body.deadline,
        done: false,
        todoid: todo.id,
      });
      res.status(200).json(todoelement);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  const updatetodoElement = async (req, res) => {
    const { body } = req;
    try {
      console.log(body);
      const todoelement = await Todoelement.findByPk(body.id);
      console.log(todoelement);

      await todoelement.update({
        name: body.name,
        deadline: body.deadline,
        done: body.done,
      });
      res.status(200).json(todoelement);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getTodoListByUser,
    getTodoByUser,
    addtodoElement,
    updatetodoElement,
  };
};

module.exports = TodoController;
