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
import { RecordEntity } from 'src/database/entities/record.entity';
import { CreateRecordDTO } from './dto/create-record.dto';
import { GetRecordsDTO } from './dto/get-records.dto';

@ApiTags('Records')
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @ApiOperation({ summary: 'Create record' })
  @ApiOkResponse({ type: RecordEntity })
  public createRecord(@Body() data: CreateRecordDTO): Promise<RecordEntity> {
    return this.recordService.createRecord(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records by filters' })
  @ApiOkResponse({ type: [RecordEntity] })
  public getAllRecords(@Query() query: GetRecordsDTO): Promise<RecordEntity[]> {
    return this.recordService.getRecords(query);
  }

  @Get('/:recordId')
  @ApiOperation({ summary: 'Get record by id' })
  @ApiOkResponse({ type: RecordEntity })
  public getRecordById(
    @Param('recordId') recordId: string,
  ): Promise<RecordEntity> {
    return this.recordService.getRecordById(recordId);
  }

  @Delete('/:recordId')
  @ApiOperation({ summary: 'Delete Record by id' })
  public deleteRecord(@Param('recordId') recordId: string): Promise<void> {
    return this.recordService.deleteRecord(recordId);
  }
}
