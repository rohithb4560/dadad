export interface CreateConfigration {
    readonly enterpriseID: string;
    readonly dataTransferMechanism: string;
    readonly fTPLocation: string;
    readonly fileArrivalCutoff: Date;
    readonly fileFormat: string;
    readonly fileParsingContract: string;
    readonly successFilePath: string;
    readonly failureFilePath: string;
  }