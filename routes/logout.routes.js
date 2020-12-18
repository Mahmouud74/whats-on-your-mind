const logout=require('express').Router()
logout.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        res.redirect('/signin')
    })
});
module.exports=logout
