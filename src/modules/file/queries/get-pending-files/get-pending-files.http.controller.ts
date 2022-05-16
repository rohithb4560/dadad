import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts/dist';
import { GetpendingFileResponse } from '../../dtos/get-pending-files.response.dto';
import { GetpendingFilesRequest } from './get-pending-query.request.dto';
import { GetPendingFilesQuery } from './get-pending-files.query';
import { FileEntity } from '../../domain/entities/file.entity';

@Controller(routesV1.version)
export class GetPendingFilesHttpController {
  constructor(private readonly queryBys: QueryBus) {}

  @Get(routesV1.file.root)
  @ApiOperation({ summary: 'Find pending files' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetpendingFileResponse,
  })
  async findFiles(@Body() request: GetpendingFilesRequest): Promise<GetpendingFileResponse[]> {
    const query = new GetPendingFilesQuery(request);
    const result: Result<FileEntity[], Error> = await this.queryBys.execute(
      query,
    );

    /* Returning Response classes which are responsible
       for whitelisting data that is sent to the user */
    return result.unwrap().map(file => new GetpendingFileResponse(file));
  }
  //====> Updata files<====//
  
}
