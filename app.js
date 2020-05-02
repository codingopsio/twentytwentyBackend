const express = require('express');
const app = express();
const mongoConnect = require('./config/db');

//routes
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const qnaRoute = require('./routes/api/qna');
//@port
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }))

//@mongo connect
mongoConnect();

//@all routes
app.use('/api/users' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/qna' , qnaRoute);
//@server
app.listen(PORT , () => {
    console.log('server running')
});


