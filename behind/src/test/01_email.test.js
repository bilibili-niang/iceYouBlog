const nodemailer = require('nodemailer')

const userEmail = '2714351312@qq.com'
const pass = 'rtviubmzlszrdcdc'
//接收者
// const receivers = 'zhonglikaisa@gmail.com'
const receivers = '2714351312@qq.com'

const judge = '您的验证码: ' + Math.random().toString(36).slice(- 8)

const transporter = nodemailer.createTransport({
	host: 'smtp.qq.com',
	secure: false,
	// host: 'smtp.qq.email',
	// service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
	// port: 465, // SMTP 端口
	// secureConnection: true, // 使用了 SSL
	auth: {
		// user: 'killicestone@126.com',
		user: userEmail,
		// user: '2714351312@qq.com',
		// 这里密码不是qq密码，是你设置的smtp授权码
		pass: pass,
	}
})

console.log(judge)
const mailOptions = {
	from: userEmail, // sender address
	to: receivers, // list of receivers
	subject: '邮箱测试服务', // Subject line
	// 发送text或者html格式
	text: judge, // plain text body
	html: '<b>Hello,这里是您的验证码' +
		`${judge}` +
		'</b>' // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error)
	}
	console.log('success')
	// console.log('Message sent: %s', info)
	// Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
})