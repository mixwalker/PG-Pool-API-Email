const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: '',
    },
});

app.use(bodyParser.json())

app.post('/mail/send', (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const text = req.body.text;

    transporter.sendMail({
        from: '"CDG" <whoami@gmail.com>',
        to: to,
        subject: subject,
        text: text,
        html: text,
    }).then(() => {
        res.status(200).json({
            error: false,
            msg: 'Sent successfully.'
        })
    }).catch(() => {
        res.status(500).json({
            error: true,
            msg: 'Sent error.'
        })
    });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
