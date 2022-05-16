import { Query } from '@libs/ddd/domain/base-classes/query-handler.base';
import { FileDirection } from '../../domain/entities/file.direction';
import { FileParseStatus } from '../../domain/entities/file.parse.status';

// Query is a plain object with properties
export class GetPendingFilesQuery extends Query {
  constructor(props: GetPendingFilesQuery) {
    super();
    this.dataSourceConfigId = props.dataSourceConfigId;
    this.direction = props.direction;
    this.fileOriginalName = props.fileOriginalName;
    this.fileDestinationPath = props.fileDestinationPath;
    this.isValid = props.isValid;
    this.noOfRows = props.noOfRows ? props.noOfRows : 0;
    this.parsedOn = props.parsedOn ? props.parsedOn : undefined;
    this.parseAttempts = props.parseAttempts ? props.parseAttempts : undefined;
    this.parseStatus = props.parseStatus ? props.parseStatus : FileParseStatus.failure;
    this.statusComment = props.statusComment ? props.statusComment : "";

    
  }

  readonly dataSourceConfigId?: string;
  readonly direction: FileDirection;

    readonly fileOriginalName: string;

    readonly fileDestinationPath: string;

    readonly isValid: boolean;

    readonly noOfRows?: number;

    readonly parsedOn?: Date;

    readonly parseAttempts?: number;

    readonly parseStatus?: FileParseStatus;

    readonly statusComment?: string;

  
}
