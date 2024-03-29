require('dotenv').config()
console.log(process.env.PASSWORD)
const express = require('express')
const app = express()
const port = 5001

const bodyParser = require("body-parser");

const config = require('./config/key');

const {User} = require("./models/User");

//bodyParser을 통해서 client로 받는 정보들을 json 형태로 변환한다.
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected... "))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send("Hello"))

app.post('/register', async (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(200).json({success:true})
  } catch (err) {
    return res.json({success:false, err})
  }
})
app.listen(port, () => console.log(`Example app listening on port ${port}`))