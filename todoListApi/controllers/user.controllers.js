const  userCTRL = {};

const User = require("../model/User");

userCTRL.createUser = async(req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body)

    const newUser = new User({
        name,
        email,
        password
    });

    await newUser.save();

    res.status(201).send({
        ok: true,
        user
    });
}

userCTRL.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};



module.exports = userCTRL;