import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';
import { Record } from 'src/database/entities/record.entity';
import { CreateRecordDTO } from './dto/create-record.dto';
import { GetRecordsDTO } from './dto/get-records.dto';

@ApiTags('Records')
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @ApiOperation({ summary: 'Create record' })
  @ApiOkResponse({ type: Record })
  createRecord(@Body() data: CreateRecordDTO): Record {
    return this.recordService.createRecord(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records by filters' })
  @ApiOkResponse({ type: [Record] })
  getAllRecords(@Query() query: GetRecordsDTO): Record[] {
    return this.recordService.getRecords(query);
  }

  @Get('/:recordId')
  @ApiOperation({ summary: 'Get record by id' })
  @ApiOkResponse({ type: Record })
  getRecordById(@Param('recordId') recordId: string) {
    return this.recordService.getRecordById(recordId);
  }

  @Delete('/:recordId')
  @ApiOperation({ summary: 'Delete Record by id' })
  deleteRecord(@Param('recordId') recordId: string) {
    return this.recordService.deleteRecord(recordId);
  }
}
