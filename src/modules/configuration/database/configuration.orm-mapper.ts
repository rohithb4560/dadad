import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { ConfigurationEntity, ConfigurationProps } from '../domain/entities/configuration.entity';
import { ConfigurationOrmEntity } from './configuration.orm-entity';

export class ConfigurationOrmMapper extends OrmMapper<ConfigurationEntity, ConfigurationOrmEntity> {
  protected toOrmProps(entity: ConfigurationEntity): OrmEntityProps<ConfigurationOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<ConfigurationOrmEntity> = {
        enterpriseID: props.enterpriseID,
        dataTransferMechanism: props.dataTransferMechanism,
        fTPLocation: props.fTPLocation,
        fileArrivalCutoff: props.fileArrivalCutoff,
        fileFormat: props.fileFormat,
        fileParsingContract: props.fileParsingContract,
        successFilePath: props.successFilePath,
        failureFilePath: props.failureFilePath
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: ConfigurationOrmEntity): EntityProps<ConfigurationProps> {
    const id = new UUID(ormEntity.id);
    const props: ConfigurationProps = {
        enterpriseID: ormEntity.enterpriseID,
        dataTransferMechanism: ormEntity.dataTransferMechanism,
        fTPLocation: ormEntity.fTPLocation,
        fileArrivalCutoff: ormEntity.fileArrivalCutoff,
        fileFormat: ormEntity.fileFormat,
        fileParsingContract: ormEntity.fileParsingContract,
        successFilePath: ormEntity.successFilePath,
        failureFilePath: ormEntity.failureFilePath
    };
    return { id, props };
  }
}
