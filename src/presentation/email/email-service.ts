import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendEmailOptions{
 to: string | string[];
 subject: string;
 htmlBody: string;
 attachements?: Attachements []
}

export interface Attachements{
 fileName: string;
 path: string;
}

export class EmailService{

    constructor(
        private readonly mailerService = envs.MAILER_SERVICE,
        private readonly userMailerEmail = envs.MAILER_EMAIL,
        private readonly mailerSecretKey = envs.MAILER_SECRET_KEY,
    ){}

    private transporter = nodemailer.createTransport({
        service: this.mailerService,
        auth: {
            user: this.userMailerEmail,
            pass: this.mailerSecretKey
        },
        tls:{
            rejectUnauthorized: false
        }
    });
    
    async sendEmail( options: SendEmailOptions): Promise<boolean>{

        const {to, subject, htmlBody, attachements=[]} = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
                attachments: attachements
            });

            return true;

        } catch (error) {

           return false; 
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){

        const subject = 'prueba de logs';

        const htmlBody = 
        `
        <p>
        Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat.
        </p>
        <p>Ver logs adjuntos</p>
        `;

        const attachements: Attachements[]= [
            { fileName: 'logs-all.log', path: './logs/logs-all.log'},
            { fileName: 'logs-high.log', path: './logs/logs-high.log'},
            { fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({to, subject, htmlBody, attachements});
    }
}