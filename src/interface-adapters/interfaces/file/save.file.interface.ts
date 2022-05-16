import { FileDirection } from "@src/modules/file/domain/entities/file.direction";
import { FileParseStatus } from "@src/modules/file/domain/entities/file.parse.status";

/*  Creating interfaces like this may be useful if you need to share types with
    a front end web/mobile application, microservices, or other TypeScript APIs.
    You can share interfaces as a git submodule, a npm package, a library or in a monorepo, etc.
*/
export interface SaveFile {
    
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