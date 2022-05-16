import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { ConfigurationEntity, ConfigurationProps } from '../domain/entities/configuration.entity';
import { ConfigurationOrmEntity } from './configuration.orm-entity';
import { ConfigurationRepositoryPort } from './configuration.repository.port';
import { BaseEntityProps } from '@src/libs/ddd/domain/base-classes/entity.base';
import { DeepPartial } from '@src/libs/types';
import { ConfigurationOrmMapper } from './configuration.orm-mapper';
import { NotFoundException } from '@src/libs/exceptions';

@Injectable()
export class ConfigurationRepository
  extends TypeormRepositoryBase<ConfigurationEntity, ConfigurationProps, ConfigurationOrmEntity>
  implements ConfigurationRepositoryPort {
  protected prepareQuery(params: DeepPartial<BaseEntityProps & ConfigurationProps>): WhereCondition<ConfigurationOrmEntity> {
    throw new Error('Method not implemented.');
  }
  protected relations: string[] = [];

  constructor(
    @InjectRepository(ConfigurationOrmEntity)
    private readonly configurationRepository: Repository<ConfigurationOrmEntity>,
  ) {
    super(
      configurationRepository,
      new ConfigurationOrmMapper(ConfigurationEntity, ConfigurationOrmEntity),
      new Logger('ConfigurationRepository'),
    );
  }

  async exists(enterpriseID: string): Promise<boolean> {
    const found = await this.findOneByEnterpriseID(enterpriseID);
    if (found) {
      return true;
    }
    return false;
  }

  async findOneByIdOrThrow(id: string): Promise<ConfigurationEntity> {
    const configuration = await this.findOneById(id);
    if (!configuration) {
      throw new NotFoundException(`Configuration with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(configuration);
  }

  private async findOneByEnterpriseID(
    enterpriseID: string,
  ): Promise<ConfigurationOrmEntity | undefined> {
    const configuration = await this.configurationRepository.findOne({
      where: { enterpriseID },
    });

    return configuration;
  }

  private async findOneById(id: string): Promise<ConfigurationOrmEntity | undefined> {
    const configuration = await this.configurationRepository.findOne({
      where: { id },
    });

    return configuration;
  }
}
