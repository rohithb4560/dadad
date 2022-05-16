import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { FileDirection } from './file.direction';
import { FileParseStatus } from './file.parse.status';

// Properties that are needed for a Invoice creation
export interface CreateFileProps {
    
    dataSourceConfigId: string;
    direction: FileDirection;
    processedOn: Date;
    fileOriginalName: string;
    fileDestinationPath: string;
    isValid: boolean;
    noOfRows: number;
    parsedOn: Date | null;
    parseAttempts: number | null;
    parseStatus: FileParseStatus | null;
    statusComment: string | null;
}

// All properties that a Invoice has
export interface FileProps extends CreateFileProps {
}

export class FileEntity extends AggregateRoot<FileProps> {
    protected readonly _id: UUID;
  
    static create(create: CreateFileProps): FileEntity {
      const id = UUID.generate();
      /* Setting a default role since we are not accepting it during creation. */
      const props: FileProps = { ...create };
      const file = new FileEntity({ id, props });
      return file;
    }
  
    validate(): void {
      // TODO: example
      // entity business rules validation to protect it's invariant
    }
  }