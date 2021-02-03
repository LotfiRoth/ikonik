const User = require('../models/user')

exports.userCreateAndUpdate = async (req, res) => {
    const {email, firstName, lastName, dateOfBirth, picture} = req.user;
    const user = await User.findOneAndUpdate(
        {email: email}, 
        {firstName: firstName, lastName: lastName, dateOfBirth:dateOfBirth, picture: picture}, {new: true});

    if(user) {
        console.log('USER UPDATED:', user)
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            firstName,
            lastName,
            dateOfBirth,
            picture
        }).save();
        console.log('USER CREATED:', newUser)
        res.json(newUser)
    }
};

exports.userCurrent = async (req, res) => {
    (User.findOne({email: req.user.email})).exec((err, user) => {
        if(err) throw new Error(err);
        res.json(user);
    })
}
