import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';
import { FileDirection } from '../domain/entities/file.direction';
import { FileEntity } from '../domain/entities/file.entity';
import { FileParseStatus } from '../domain/entities/file.parse.status';

@Entity('file')
export class FileOrmEntity extends TypeormEntityBase {
    constructor(props?: FileEntity) {
      super(props);
    }
   
    @Column()
    dataSourceConfigId: string;

    @Column()
    direction: FileDirection;
  
    @Column({
        type: 'timestamptz',
    })
    processedOn: Date;
  
    @Column()
    fileOriginalName: string;

    @Column()
    fileDestinationPath: string;

    @Column()
    isValid: boolean;

    @Column()
    noOfRows: number;

    @Column({
      type: 'timestamptz',
      nullable: true,
    })
    parsedOn: Date | null;

    @Column({
      type: 'int',
      nullable: true,
    })
    parseAttempts!: number | null;

    @Column({
      type: 'text',
      nullable: true,
    })
    parseStatus: FileParseStatus | null;

    @Column({
      type: 'text',
      nullable: true,
    })
    statusComment: string | null;
  }