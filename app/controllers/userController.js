const User = require("../models/User");
const { Op } = require("sequelize");
const userValidation = require("../validations/userValidation");
const Clock = require("../models/Clock");
const Complements = require("../models/Complements");
const Newsfeed = require("../models/Newsfeed");
const Todo = require("../models/Todo");
const Weather = require("../models/Weather");
const Weatherforecast = require("../models/Weatherforecast");
const bcryptService = require("../services/bcrypt.service");
const authService = require("../services/auth.service");
const componentsService = require("../services/components.service");

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;
    const { error } = userValidation.registerValidation(body);
    if (error) return res.status(400).json(error);
    const userExist = await User.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.iLike]: body.email } },
          { username: { [Op.iLike]: body.username } },
        ],
      },
    });
    if (userExist)
      return res.status(203).json("The email is already registered.");
    try {
      const user = await User.create({
        username: body.username,
        fullname: body.fullname,
        email: body.email,
        password: body.password,
        avatar: body.avatar,
        timeformat: 1,
        unit: 1,
      }).then(async (response) => {
        const id_user = response.dataValues.id;
        await Clock.create({
          name: "Clock",
          position: "top_left",
          active: true,
          timezone: "Africa/Tunis",
          isdigital: true,
          userid: id_user,
        });
        await Complements.create({
          name: "Complements",
          position: "",
          active: true,
          userid: id_user,
        });
        await Newsfeed.create({
          name: "Newsfeed",
          position: "",
          active: true,
          showdescription: true,
          userid: id_user,
        });
        await Todo.create({
          name: "Todo list",
          position: "",
          active: true,
          periodicity: 1,
          userid: id_user,
        });
        await Weather.create({
          name: "Weather",
          position: "",
          active: true,
          location: "...",
          userid: id_user,
        });
        await Weatherforecast.create({
          name: "Weather",
          position: "",
          active: true,
          location: "...",
          numberofdayes: 3,
          colored: true,
          userid: id_user,
        });
      });
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const login = async (req, res) => {
    const { identifier, password } = req.body;
    const { error } = userValidation.loginValidation(req.body);
    if (error) return res.status(400).json(error);
    if (identifier && password) {
      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [
              { email: { [Op.iLike]: identifier } },
              { username: { [Op.iLike]: identifier } },
            ],
          },
        });
        if (!user) {
          return res.status(400).json({ msg: "Bad Request: User not found" });
        }
        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });
          return res.status(200).json({ token, user });
        }
        return res.status(500).json("internal error 22");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getComponents = async (req, res) => {
    const { userId } = req.params;
    const components = await componentsService().getComponentsByUser(userId);
    res.status(200).json(components);
  };
  return {
    register,
    login,
    getComponents,
  };
};
module.exports = UserController;
