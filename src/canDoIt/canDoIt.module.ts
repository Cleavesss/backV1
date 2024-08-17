import { Module } from '@nestjs/common';
import { CanDoItController } from './canDoIt.controller';
import { CanDoItService } from './canDoIt.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CanDoItController],
  providers: [CanDoItService],
  imports: [
    AuthModule
  ]
})
export class CanDoItModule {}
