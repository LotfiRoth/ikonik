const admin = require('../firebase/index');
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
    // console.log(req.headers); 
    try {
        const firebaseUser= await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
            console.log('firebase user:', firebaseUser);
            req.user = firebaseUser;
            next();
    } catch (err) {
        res.status(401).json({
            err: "Token is invalid or expired"
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    const {email} = req.user

    const adminUser = await User.findOne({email: email}).exec()

    if(adminUser.role !== 'admin') {
        res.status(403).json({
            err: "Admin access only"
        })
    } else {
        next();
    }
}