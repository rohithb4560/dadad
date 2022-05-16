import {
    Command,
    CommandProps,
  } from '@src/libs/ddd/domain/base-classes/command.base';
import { FileDirection } from '../../domain/entities/file.direction';
import { FileParseStatus } from '../../domain/entities/file.parse.status';

  export class SaveFileCommand extends Command {
    constructor(props: CommandProps<SaveFileCommand>) {
      super(props);
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

    readonly dataSourceConfigId: string;

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