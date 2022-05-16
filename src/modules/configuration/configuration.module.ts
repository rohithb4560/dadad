import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationRepository } from './database/configuration.repository';
import { CreateConfigurationService } from './commands/create-configuration/create-configuration.service';
import { ConfigurationOrmEntity } from './database/configuration.orm-entity';
import { CreateConfigurationController } from './commands/create-configuration/create-configuration.controller';
import { CqrsModule } from '@nestjs/cqrs';

const httpControllers = [
  CreateConfigurationController
];

const repositories = [ConfigurationRepository];

const commandHandlers = [CreateConfigurationService];


@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [
    ...repositories,
    ...commandHandlers,
  ],
})
export class ConfigurationModule {}