const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

//发件人邮箱
const userEmail = '2714351312@qq.com'
//发件人的smtp
const emailPass = 'rtviubmzlszrdcdc'

class EmailController {
	//发送验证码
	sendVerification (receivers, subject, text, code) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.qq.com', secure: false, auth: {
				user: userEmail,
				pass: emailPass,
			}
		})
		const mailOptions = {
			from: userEmail, // sender address
			to: receivers, // list of receivers
			subject: subject, // Subject line
			// 发送text或者html格式
			text: code, // plain text body
			html: `<b>Hello,这里是您的验证码: ${code}</b>` // html body
		}
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('email send error')
				console.log(error)
			} else {
				console.log('email send success')
			}
		})
	}
	
	//给指定邮箱发送指定的code
	sendVerificationByEmail (receivers, code) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.qq.com', secure: false, auth: {
				user: userEmail,
				pass: emailPass,
			}
		})
		
		const mailOptions = {
			from: userEmail, // sender address
			to: receivers, // list of receivers
			subject: '验证码', // Subject line
			// 发送text或者html格式
			text: code, // plain text body
			html: `<b>Hello,这里是您的验证码: ${code}</b>` // html body
		}
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('email send error')
				console.log(error)
			} else {
				console.log('email send success')
			}
		})
		
	}
}

module.exports = new EmailController()