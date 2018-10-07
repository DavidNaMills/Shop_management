require('./database/connection');
require('./passport/passport');
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const passport = require('passport');



const app = express();

app.use(bodyparser.json());
app.use(cors({
    credentials: true, origin: 'http://localhost:1234'
}));

app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV==="production"){
    const path= require("path");
    const publicPath = path.join(__dirname, '..','build');
    app.use(express.static(publicPath));
    app.get('*', (req, res)=>{
        res.json('help!!!');
        // res.sendFile(path.join(publicPath, 'index.html'));
    });    
}

require('./routes/customerRoutes')(app);
require('./routes/staffRoutes')(app);
require('./routes/inventoryRoutes')(app);
require('./routes/purchasesRoutes')(app);



module.exports=app;