import { Module } from '@nestjs/common';
import { UsermanagementController } from './usermanagement.controller';

@Module({
  controllers: [UsermanagementController]
})
export class UsermanagementModule {}
