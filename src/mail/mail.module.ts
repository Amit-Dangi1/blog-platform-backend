import { Queue } from 'bullmq';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { MAIL_QUEUE } from './mail.constants';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { QueueModule } from '../queue';
import { MailTestController } from './📁 mail-test.controller';

@Module({
  imports: [QueueModule.registerAsync(MAIL_QUEUE)],
  controllers:[MailTestController],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule implements OnApplicationShutdown {
  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly mailQueue: Queue,
  ) {}

  async onApplicationShutdown() {
    await this.mailQueue.disconnect();
  }
}
