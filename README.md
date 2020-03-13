# NodejsMail
nodejs发送邮箱找回密码

基于nodejs为后台的发送邮箱请求找回密码的一些知识点记录和补充

~~~js
//初始化一个packge.json
npm init

Mac:sudo npm install nodemon -g//Mac安转nodemon
Mindows:npm install nodemon -g//windows安装
~~~

~~~js
//项目需要的模块
express:创建本地服务
mongoose:MongoDB数据库连接
nodemailer:邮件发送
body-parser:获取前端传递的值
npm install express mongoose nodemailer body-parser -S
~~~

~~~js
//识别环境变量模块
npm install dotenv -S
//引用dotenv
require("dotenv").config();
~~~



####	打包到线上heroku：

- 首先你要安转heroku的一个脚手架，
  [heroku脚手架下载地址](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

~~~js
1.heroku
安装好heroku的查看 直接执行命名heroku  会显示很多的提示命令
2.heroku login
会打开浏览器进行登录
3.heroku create
创建一个项目,相当与在heroku建立了一个服务器
heroku网页端setting中修改创建的服务器的名字，方便日后查看回忆 deploy中按照步骤传代码到heroku就可以了

git init
heroku git:remote -a *******(**代表你创建的仓库)
git add .
git commit -am "make it better"
git push heroku master
~~~

记录些问题：

本项目的server.js文件中

~~~js
user: '1********9@qq.com',//用了环境变量下的邮箱
pass: "**********"//用了环境变量下的密码
请使用自己的有限和邮箱的IMAP/SMTP服务
~~~



这里部署好了之后无法访问地址，看了下应该是小问题，这里做个记录，稍后改动下

