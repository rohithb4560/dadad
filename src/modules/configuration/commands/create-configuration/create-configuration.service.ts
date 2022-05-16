import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base';
import { Err, Ok, Result } from 'oxide.ts/dist';
import { CreateConfigurationCommand } from './create-configuration.command';
import { ConfigurationAlreadyExistsError } from '../../errors/configuration.errors';
import { ConfigurationRepositoryPort } from '../../database/configuration.repository.port';
import { ConfigurationEntity } from '../../domain/entities/configuration.entity';

@CommandHandler(CreateConfigurationCommand)
export class CreateConfigurationService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateConfigurationCommand,
  ): Promise<Result<ID, ConfigurationAlreadyExistsError>> {
    const configurationRepo: ConfigurationRepositoryPort = this.unitOfWork.getConfigurationRepository(
      command.correlationId,
    );
    if (await configurationRepo.exists(command.enterpriseID)) {
      return Err(new ConfigurationAlreadyExistsError());
    }

    const configuration = ConfigurationEntity.create({
        enterpriseID:command.enterpriseID,
        dataTransferMechanism:command.dataTransferMechanism,
        fTPLocation:command.fTPLocation,
        fileArrivalCutoff:command.fileArrivalCutoff,
        fileFormat:command.fileFormat,
        fileParsingContract:command.fileParsingContract,
        successFilePath:command.successFilePath,
        failureFilePath:command.failureFilePath

    });

    const created = await configurationRepo.save(configuration);
    return Ok(created.id);
  }
}
