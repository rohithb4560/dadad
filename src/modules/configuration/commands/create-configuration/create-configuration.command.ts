import {
    Command,
    CommandProps,
  } from '@src/libs/ddd/domain/base-classes/command.base';
  
  export class CreateConfigurationCommand extends Command {
    constructor(props: CommandProps<CreateConfigurationCommand>) {
      super(props);
      this.enterpriseID = props.enterpriseID;
      this.dataTransferMechanism = props.dataTransferMechanism;
      this.fTPLocation = props.fTPLocation;
      this.fileArrivalCutoff = props.fileArrivalCutoff;
      this.fileFormat = props.fileFormat;
      this.fileParsingContract = props.fileParsingContract;
      this.successFilePath = props.successFilePath;
      this.failureFilePath = props.failureFilePath;
    }
  
    readonly enterpriseID: string;

    readonly dataTransferMechanism: string;

    readonly fTPLocation: string;

    readonly fileArrivalCutoff: Date;

    readonly fileFormat: string;

    readonly fileParsingContract: string;

    readonly successFilePath: string;

    readonly failureFilePath: string;
  }