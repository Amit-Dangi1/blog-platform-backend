import { Redis } from 'ioredis';
import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@Common';

@Module({
  imports: [
    // ✅ THIS IS THE MISSING PIECE (WORKER ENABLED)
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables, true>) => ({
        connection: new Redis(configService.get('REDIS_URI'), {
          maxRetriesPerRequest: null,
        }),
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {
  static registerAsync(name: string): DynamicModule {
    return BullModule.registerQueueAsync({
      name,
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        connection: new Redis(configService.get('REDIS_URI'), {
          maxRetriesPerRequest: null,
        }),
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: {
            age: 86400, // 24 hr
          },
        },
      }),
      inject: [ConfigService],
    });
  }
}
