import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { ConfigurationEntity, ConfigurationProps } from '../domain/entities/configuration.entity';

export interface ConfigurationRepositoryPort
  extends RepositoryPort<ConfigurationEntity, ConfigurationProps> {
    findOneByIdOrThrow(id: string): Promise<ConfigurationEntity>;
    exists(enterpriseID: string): Promise<boolean>;
}