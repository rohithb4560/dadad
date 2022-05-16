import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { FileEntity, FileProps } from '../domain/entities/file.entity';
import { FileOrmEntity } from './file.orm-entity';

export class FileOrmMapper extends OrmMapper<FileEntity, FileOrmEntity> {
  protected toOrmProps(entity: FileEntity): OrmEntityProps<FileOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<FileOrmEntity> = {
      
      dataSourceConfigId: props.dataSourceConfigId,
      direction: props.direction,
      processedOn: props.processedOn,
      fileOriginalName: props.fileOriginalName,
      fileDestinationPath: props.fileDestinationPath,
      isValid: props.isValid,
      noOfRows: props.noOfRows,
      parsedOn: props.parsedOn,
      parseAttempts : props.parseAttempts,
      parseStatus: props.parseStatus,
      statusComment: props.statusComment
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: FileOrmEntity): EntityProps<FileProps> {
    const id = new UUID(ormEntity.id);
    const props: FileProps = {
      
      dataSourceConfigId: ormEntity.dataSourceConfigId,
      direction : ormEntity.direction,
      processedOn: ormEntity.processedOn,
      fileOriginalName: ormEntity.fileOriginalName,
      fileDestinationPath: ormEntity.fileDestinationPath,
      isValid: ormEntity.isValid,
      noOfRows: ormEntity.noOfRows,
      parsedOn: ormEntity.parsedOn,
      parseAttempts : ormEntity.parseAttempts,
      parseStatus: ormEntity.parseStatus,
      statusComment: ormEntity.statusComment
    };
    return { id, props };
  }
}