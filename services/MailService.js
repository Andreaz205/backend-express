const nodemailer = require ("nodemailer")

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            // host: process.env.SMTP_HOST,
            host: 'smtp.mail.ru',
            // port: process.env.SMTP_PORT,
            port: 587,
            secure: true,
            auth: {
                user: 'andrei-bazunov@mail.com',
                pass: 'McG7FtXCJCW4C8jp1ys6'

            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'andrei-bazunov@mail.com',
            to,
            subject: "Активация аккаунта на " + "http://localhost:5000",
            text: "",
            html:
                `

                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}"> ${link} </a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()