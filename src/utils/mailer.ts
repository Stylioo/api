import nodeMailer from 'nodemailer'

const SMTP_EMAIL = 'consuelo.nikolaus@ethereal.email'
const SMTP_PASSWORD = '4hR87745kj6wjbeSyu'

const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
    }
})

const generateMailForSendPassword = (username: string, password: string) => {
    return (
        `<h1>Stylioo - Beauty Salon</h1>
        <p>Hi, This is the Login credentials for your account in Stylioo beauty salon management system.</p>
        <br><p>Username: ${username}</p><br>
        <p>Password: ${password}</p>
        `
    )
}

const sendMail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: 'janithpm9991@gmail.com',
            to,
            subject,
            html,
        })

        return info

    } catch (err) {
        return null
        console.log(err)
    }
}

export default sendMail

export { generateMailForSendPassword }