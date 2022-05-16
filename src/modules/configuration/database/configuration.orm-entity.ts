import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';
import { ConfigurationEntity } from '../domain/entities/configuration.entity';

@Entity('datasourceconfig')
export class ConfigurationOrmEntity extends TypeormEntityBase {
  constructor(props?: ConfigurationEntity) {
    super(props);
  }

  @Column()
  enterpriseID: string;

  @Column()
  dataTransferMechanism: string;

  @Column()
  fTPLocation: string;

  @Column({
    type: 'timestamptz',
  })
  fileArrivalCutoff: Date;

  @Column()
  fileFormat: string;

  @Column()
  fileParsingContract: string;

  @Column()
  successFilePath: string;

  @Column()
  failureFilePath: string;

}