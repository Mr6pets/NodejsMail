const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();

//引入User的模板，
const User = require('./models/User');

const app = express();

//使用bodyparser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 连接数据库MongoDB
mongoose.connect("mongodb+srv://nodemail:s2011la6134@cluster0-rzg8n.mongodb.net/nodemail?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
)
  .then(() => {
    console.log("mongoDB connected")
  })
  .catch(err => console.log(err))


//路由测试下
app.get('/', (req, res) => {
  res.json({ status: 'suc', msg: 'it works' })
})

//添加用户接口
app.post('/addUser', (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        //如果查到了 那就说明数据库里有值，所以给他提示用户已经存在了
        res.status(400).json({
          state: "failed",
          msg: "该用户已存在"
        })
      } else {//如果没查到 那就用new user的方法去存
        const newUser = new User({
          username: req.body.username,
          pwd: req.body.pwd,
          email: req.body.email
        });
        // newUser是我们实例化出来的一个new User的模板对象，直接调用 mongoDB的方法
        newUser.save().then((user) => {
          res.status(200).json({
            state: "suc",
            msg: "添加用户成功",
            data: user
          })
        }).catch((err) => { console.log(err) })
      }
    })
})
//找回密码接口
app.post('/retrievePwd', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {//如果数据库中没有查到这个用户
      res.status(400).json({
        state: 'failed',
        msg: '该用户不存在'
      })
    } else {//查到了这个用户,那就依赖nodemailer来进行密码找回

      //step1：使用什么邮箱来发送的邮箱配置
      let transporter = nodemailer.createTransport({
        service: "qq",//使用邮箱的种类说明
        secure: true,//采用安全的模式
        auth: {//发送邮件的用户名和密码
          //这里的user 和pass都是开发环境的设置，如果放置到线上要么服务器配置环境变量，要么直接写配置
          // user: process.env.EMAIL,//用了环境变量下的邮箱
          // pass: process.env.PASSWORD//用了环境变量下的密码

          user: '1********9@qq.com',//用了环境变量下的邮箱
          pass: "igekqkvicqqnhhbi"//用了环境变量下的密码
        }
      });
      // step2 发送的信息配置
      let mailOptions = {
        form: "1761330769@qq.com",//从那个邮箱发送
        to: req.body.email,//接收的邮箱就是用户传递过来的，接收的邮箱是不同的
        // cc: "抄送",
        // bcc:"私密发送"
        subject: "找回密码",//发送时候的标题
        text: `您的用户名:${user.username},密码是${user.pwd}`
      }
      //step3: 开始发送
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          res.status(400).json({
            state: 'failed',
            msg: err
          });
        } else {
          res.status(200).json({
            state: 'suc',
            msg: `密码已发送至您的邮箱${req.body.email}`
          });
        }
      })
    }
  })
})

const port = process.env.PORT || 5002

app.listen(port, () => {
  console.log(`server is running,port is ${port}`);
})



