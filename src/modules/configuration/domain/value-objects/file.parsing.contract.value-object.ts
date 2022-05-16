import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@libs/exceptions';

export interface FileParsingContractProps {
  columnName: string;
  name: string;
  dataType: string;
  lenght: number;
  required: boolean;
}

export class FileParsingContract extends ValueObject<FileParsingContractProps> {
  protected validate(props: FileParsingContractProps): void {
    if (!Guard.lengthIsBetween(props.columnName, 2, 50)) {
      throw new ArgumentOutOfRangeException('column name is out of range');
    }
  }
}
