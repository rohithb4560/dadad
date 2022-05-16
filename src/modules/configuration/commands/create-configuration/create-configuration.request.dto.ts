import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
} from 'class-validator';
import { CreateConfigration } from '@src/interface-adapters/interfaces/configuration/create.configuration.interface';

export class CreateConfigurationRequest implements CreateConfigration {
    @ApiProperty({
        example: 'befb9206-d95a-465b-ab30-44502669eb0b',
        description: 'Enterprise ID',
      })
      @IsUUID()
      readonly enterpriseID: string;

      @ApiProperty({
        example: 'sftp',
        description: 'Data Transfer Mechanism',
      })
      readonly dataTransferMechanism: string;

      @ApiProperty({
        example: '',
        description: 'FTP Location',
      })
      readonly fTPLocation: string;

      @ApiProperty({
        example: '01/01/2020',
        description: 'File Arrival Cutoff',
      })
      readonly fileArrivalCutoff: Date;

      @ApiProperty({
        example: 'csv',
        description: 'File Format',
      })
      readonly fileFormat: string;

      @ApiProperty({
        example: '{}',
        description: 'File Parsing Contract',
      })
      readonly fileParsingContract: string;

      @ApiProperty({
        example: '',
        description: 'Success File Path',
      })
      readonly successFilePath: string;

      @ApiProperty({
        example: '',
        description: 'Failure File Path',
      })
      readonly failureFilePath: string;
}
