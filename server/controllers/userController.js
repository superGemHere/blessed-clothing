const router = require('express').Router();

const jwt = require('../lib/jwt');
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
        });
        
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
        });
    
        res.json(result);

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/logout', (req, res) => {
    // Clear the 'accessToken' cookie by setting its expiration date to the past
    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'Strict', // Controls when cookies are sent with cross-site requests
        expires: new Date(0) // Expire the cookie immediately
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/getAccessToken', async (req, res) => {
    // Check if the 'accessToken' cookie exists
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: 'No access token found' });
    }

    // Optionally decode and validate the token here if you want
    // For example, with JWT:
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    // Send the access token or user data back to the frontend
    res.status(200).json({ accessToken: token, email: decodedToken.email, userId: decodedToken._id });
});


module.exports = router;
