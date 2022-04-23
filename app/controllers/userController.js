const User = require("../models/User");
const { Op } = require("sequelize");
const userValidation = require("../validations/userValidation");
const Clock = require("../models/Clock");
const Complements = require("../models/Complements");
const Newsfeed = require("../models/Newsfeed");
const Todo = require("../models/Todo");
const Calendar = require("../models/Calendar");
const Weather = require("../models/Weather");
const Weatherforecast = require("../models/Weatherforecast");
const bcryptService = require("../services/bcrypt.service");
const authService = require("../services/auth.service");
const componentsService = require("../services/components.service");
const Newsfeed_Feed = require("../models/Newsfeed_Feed");
const Feed = require("../models/Feed");
const jwt_decode = require("jwt-decode");

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
      return res.status(203).json("username or email is already registered.");
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
          name: "Compliments",
          position: "top_left",
          active: false,
          userid: id_user,
        });
        await Calendar.create({
          name: "Calendar",
          position: "bottom_right",
          country: "Tunis",
          active: true,
          userid: id_user,
        });
        await Newsfeed.create({
          name: "News Feed",
          position: "",
          active: true,
          showdescription: true,
          userid: id_user,
        });
        await Todo.create({
          name: "Todo List",
          position: "top_right",
          active: true,
          periodicity: 1,
          userid: id_user,
        });
        await Weather.create({
          name: "Weather",
          position: "middle_left",
          active: true,
          location: "Arian, Tunisia", //body.location
          userid: id_user,
        });
        await Weatherforecast.create({
          name: "Forecast",
          position: "middle_right",
          active: false,
          location: "Ariana, Tunisia", //body.position
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
  const refreshLogin = async (req, res) => {
    const { token } = req.body;
    const decoded = jwt_decode(token);
    console.log(decoded);
    try {
      const user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(400).json("user not found");
      } else {
        return res.status(200).json({ token, user });
      }
    } catch (e) {
      res.status(500).json("Internal server error");
    }
  };
  const login = async (req, res) => {
    const { identifier, password } = req.body;
    const { error } = userValidation.loginValidation(req.body);
    //if (error) return res.status(400).json(error);
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
        return res.status(500).json("internal error ");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editProfile = async (req, res) => {
    const { body } = req;
    const user = await User.findByPk(body.id);
    if (!!body.fullname) {
      user.update({
        fullname: body.fullname,
        avatar: body.avatar,
      });
      res.status(200).json(user);
    }

    if (!!body.email) {
      const emailexist = User.findOne({ where: { email: body.email } });
      if (!!emailexist) return res.status(203).json("email already exist");

      if (bcryptService().comparePassword(body.password, user.password)) {
        user.update({
          email: body.email,
        });
        res.status(200).json(user);
      } else {
        res.status(400).json("incorrect password");
      }
    }

    if (!!body.newPassword) {
      if (bcryptService().comparePassword(body.oldPassword, user.password)) {
        user.update({
          password: body.newPassword,
        });
        res.status(200).json(user);
      } else {
        res.status(400).json("incorrect password");
      }
    }
    if (!!body.timeformat) {
      user.update({
        timeformat: body.timeformat,
      });
      res.status(200).json(user);
    }
    if (!!body.unit) {
      user.update({
        unit: body.unit,
      });
      res.status(200).json(user);
    }
  };

  const getComponents = async (req, res) => {
    const { userid } = req.query;
    const components = await componentsService().getComponentsByUser(userid);
    res.status(200).json(components);
  };

  const getActiveComponents = async (req, res) => {
    const { userid } = req.query;
    const components = (
      await componentsService().getComponentsByUser(userid)
    ).filter((el) => !!el.active);

    res.status(200).json(components);
  };
  const updatePositions = async (req, res) => {
    const { body } = req;
    for (i in body) {
      var c = body[i];
      switch (c.name) {
        case "Clock":
          {
            await Clock.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;
        case "Compliments":
          {
            await Complements.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;
        case "Calendar":
          {
            await Calendar.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;
        case "News feed":
          {
            await Newsfeed.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;
        case "Todo List":
          {
            await Todo.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;
        case "Weather":
          {
            await Weather.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;
        case "Forecast":
          {
            await Weatherforecast.update(
              { position: c.position },
              { where: { id: c.id } }
            );
          }
          break;

        default:
          console.log("nom ma l9ahouch");
      }
    }

    res.status(200).json("update position");
  };
  const test = async (req, res) => {
    var newsfeed = await Newsfeed.findOne({ where: { userid: 11 } });
    try {
      var feedIds = await Newsfeed_Feed.findAll({
        attributes: ["feedid"],
        where: { newsfeedid: newsfeed.id },
      });
      console.log(feedIds[0].feedid);
      feedIds = feedIds.map((el) => el.feedid);
      console.log(feedIds);
      var feeds = await Feed.findAll({
        where: { id: { [Op.in]: feedIds } },
      });

      res.status(200).json(feeds);
    } catch (e) {
      res.status(400).json(e);
    }
  };

  return {
    register,
    login,
    refreshLogin,
    editProfile,
    getComponents,
    getActiveComponents,
    updatePositions,
    test,
  };
};
module.exports = UserController;
