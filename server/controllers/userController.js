const router = require('express').Router();

const userManager = require('../managers/userManager')

router.post('/register', async (req, res) => {
    try{
        // console.log(req.body)
        const result = await userManager.register(req.body);

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'Strict', // Controls when cookies are sent with cross-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.cookie('userInfo', {email: result.email, id: result._id}, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'Strict', // Controls when cookies are sent with cross-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.json(result);
    }catch(err){
        res.status(400).json({
            message: err.message
        });
    }
})

router.post('/login', async(req, res) => {
    try{
        const result = await userManager.login(req.body);

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'Strict', // Controls when cookies are sent with cross-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.cookie('userInfo', {email: result.email, id: result._id}, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'Strict', // Controls when cookies are sent with cross-site requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
    
        res.json(result);

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/logout', async(req, res) => {
    // TODO: INVALIDATE TOKEN
    res.end();
})

module.exports = router;
