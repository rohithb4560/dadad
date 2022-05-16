import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base';
import { Err, Ok, Result } from 'oxide.ts/dist';
import { SaveFileCommand } from './save-file.command';
import { FileAlreadyExistsError } from '../../errors/file.errors';
import { FileRepositoryPort } from '../../database/file.repository.port';
import { FileEntity } from '../../domain/entities/file.entity';
import { ConfigurationRepositoryPort } from '@src/modules/configuration/database/configuration.repository.port';
import { NotFoundException } from '@nestjs/common';
import { FileParseStatus } from '../../domain/entities/file.parse.status';

@CommandHandler(SaveFileCommand)
export class SaveFileService extends CommandHandlerBase{
    constructor(protected readonly unitOfWork: UnitOfWork) {
        super(unitOfWork);
      }

    async handle(
        command: SaveFileCommand,
    ): Promise<Result<ID, FileAlreadyExistsError>>{
        const fileRepo: FileRepositoryPort = this.unitOfWork.getFileRepository(
            command.correlationId,
        );

        const configurationRepo: ConfigurationRepositoryPort = this.unitOfWork.getConfigurationRepository(
            command.correlationId,
          );

        await configurationRepo.findOneByIdOrThrow(command.dataSourceConfigId);
        
        const file = FileEntity.create({
            dataSourceConfigId: command.dataSourceConfigId,
            direction: command.direction,
            processedOn: new Date(Date.now()),
            fileOriginalName: command.fileOriginalName,
            fileDestinationPath: command.fileDestinationPath,
            isValid: command.isValid ? command.isValid : false,
            noOfRows: command.noOfRows ? command.noOfRows : 0,
            parsedOn: command.parsedOn ? command.parsedOn : null,
            parseAttempts : command.parseAttempts ? command.parseAttempts : null,
            parseStatus: command.parseStatus ? command.parseStatus : FileParseStatus.failure,
            statusComment: command.statusComment ? command.statusComment :null
        });

        const created = await fileRepo.save(file);
        return Ok(created.id);
    }
}