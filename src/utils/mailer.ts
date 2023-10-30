import nodeMailer from 'nodemailer'

const SMTP_EMAIL = 'janithpm0@gmail.com'
const SMTP_PASSWORD = 'NV1I0BghQD2W3x8C'
// const SMTP_EMAIL = 'janithpm9991@gmail.com'
// const SMTP_PASSWORD = 'xsmtpsib-f39375e6e710cf7e149d76b75bd2f1d7f126cecd3f10a8c471509c3227941f2d-Iw2dUM0aJVqL8KrW'

const transporter = nodeMailer.createTransport({
    host: 'smtp-relay.brevo.com',
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
        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
        `
    )
}



const sendMail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: 'janithpm0@gmail.com',
            to,
            subject,
            html,
        })



        console.log(info);
        return info

    } catch (err) {
        console.log(err)
    }
}

export default sendMail

export { generateMailForSendPassword }