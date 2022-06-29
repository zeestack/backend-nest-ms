import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(data: any): Promise<string> {
    console.log('sending email....');
    return await this.mailerService.sendMail({
      to: 'zahid.ce@gmail.com',
      subject: 'Employee Registration',
      template: 'auto_generated_mail',
      context: {
        ...data,
        date: new Date(),
        name: 'Zahid',
        email: 'zahid.ce@gmail.com',
        password: 'password',
      },
    });
  }
}
