import { Module } from '@nestjs/common';
import { SizeToColorController } from './size-to-color.controller';
import { SizeToColorService } from './size-to-color.service';

@Module({
  controllers: [SizeToColorController],
  providers: [SizeToColorService],
})
export class SizeToColorModule {}
