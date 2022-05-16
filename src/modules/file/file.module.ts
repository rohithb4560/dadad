import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './database/file.repository';
import { SaveFileService } from './commands/save-file/save-file.service';
import { FileOrmEntity } from './database/file.orm-entity';
import { SaveFileFileController } from './commands/save-file/save-file.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPendingFilesHttpController } from './queries/get-pending-files/get-pending-files.http.controller';
import { GetpendingFilesRequest } from './queries/get-pending-files/get-pending-query.request.dto';
import { GetpendingFilesQueryHandler } from './queries/get-pending-files/get_pending-files.query-handler';
//import { GetPendingParsingFilesHttpController } from './queries/get-pending-parsing-files/get-pending-parsing-files.controller';
//import { GetPendingParsingFilesService } from './queries/get-pending-parsing-files/get-pending-parsing-files.service';
//import { GetPendingParsingFilesController } from './queries/get-pending-parsing-files/get-pending-parsing-files.controller';
//import { GetPendingParsingFilesHandler } from './queries/get-pending-parsing-files/get-pending-parsing-files.query-handler';

const httpControllers = [
    SaveFileFileController,
    GetPendingFilesHttpController
    //GetPendingParsingFilesHttpController
  ];

const repositories = [FileRepository];

const commandHandlers = [SaveFileService];
const queryHandlers = [GetpendingFilesQueryHandler]


@Module({
    imports: [TypeOrmModule.forFeature([FileOrmEntity]), CqrsModule],
    controllers: [...httpControllers],
    providers: [
      ...repositories,
      ...commandHandlers,
      ...queryHandlers,
    
   
    ],
  })
  export class FileModule {}