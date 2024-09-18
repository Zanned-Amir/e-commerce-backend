import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import AppError from './app.error';








class Email {

  private transporter: nodemailer.Transporter;

  constructor() {
    try{
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
          });

          this.transporter.verify((error, success) => {
            if (error) {
              console.log(error);
            

            } else {
              console.log('Server is ready to take messages');
            }
          });

        } catch (error) {
          console.log(error);
          throw new AppError('Error occurred while creating the email transporter', 500);

        }
    }

          public async sendEmail(to:any, subject:string, template:any, data:any) {
            const templatePath = path.join(__dirname, '..', 'templates', `${template}.ejs`);

         

            ejs.renderFile(templatePath, data, (err, template) => {
              if (err) {
                console.log(err);
              } else {
              

                const mailOptions = {
                  from: process.env.EMAIL_USER,
                  to,
                  subject,
                  html:  template,
                };

                this.transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                    throw new AppError('Error occurred sending email'+error, 500);

                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });          
            }
    }); 

          }


          async sendResetPasswordEmail(to:any, info:any) {

         
            const data = {
              appName: "E-commerce",
              validationTime: 10,
              ...info,
           
            };
            
            this.sendEmail(to, 'Reset Password', 'restPassword', data);
          }

          async sendVerifyEmail(to:any, info:any) {
            const data = {
              appName: "E-commerce",
              validationTime: 10,

              ...info,
            };
            this.sendEmail(to, 'Verify Email', 'verifyEmail', data);
          }

          async sendWelcomeEmail(to:any, info:any) {
            const data = {
              appName: "E-commerce",
              ...info,
            };
         
            this.sendEmail(to, 'Welcome', 'welcome', data);
          }

}

export default new Email();
          


