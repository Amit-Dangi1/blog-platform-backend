import { Controller, Get } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail-test')
export class MailTestController {
  constructor(private readonly mailService: MailService) {}

  //@Get('queue')
//   async testQueueMail() {
//     await this.mailService.send({
//       to: 'securebycode15@gmail.com',
//       subject: 'QUEUE MAIL TEST',
//       mailBodyOrTemplate: '<h1>Queue mail working 🎉</h1>',
//     });

//     return 'MAIL JOB ADDED';
//   }
}
