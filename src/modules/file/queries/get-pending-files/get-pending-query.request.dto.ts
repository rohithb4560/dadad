import { SaveFile } from '@src/interface-adapters/interfaces/file/save.file.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsOptional,
  IsUUID,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FileDirection } from '../../domain/entities/file.direction';
import { FileParseStatus } from '../../domain/entities/file.parse.status';
import { FindFiles } from '@src/interface-adapters/interfaces/file/get-files.interface';
@ArgsType() // <- only if you are using GraphQL
@InputType()
export class GetpendingFilesRequest implements FindFiles{
    @ApiProperty({
        example: 'c3ae44e4-ee94-4c20-b661-4b4e3a801090',
        description: 'GUID representing file id',
      })
      @MaxLength(320)
      @MinLength(5)
      @IsUUID()
      @Field() // <- only if you are using graphql
      readonly fileID: string;
    
      @ApiProperty({ 
          example: 'b7802e04-2416-4365-ab07-44ac283d1b8a', 
          description: 'Reference id of DataSourceConfig table' })
      @MaxLength(50)
      @MinLength(4)
      @IsUUID()
      @Field() // <- only if you are using graphql
      readonly dataSourceConfigId: string;
    
      @ApiProperty({ 
        example: FileDirection.inbound, 
        description: 'inbound / outbound' 
      })
      @IsEnum(FileDirection)
      @Field()
      readonly direction: FileDirection
    
      @ApiProperty({ 
          example: 'Somename', 
          description: 'Original name' })
      @IsString()
      @Field() // <- only if you are using graphql
      readonly fileOriginalName: string;
    
      @ApiProperty({ 
          example: 'some ftp://example.com', 
          description: 'ftp path' })
      @IsString()
      @Field() // <- only if you are using graphql
      readonly fileDestinationPath: string;
    
      @ApiProperty({ 
          example: false, 
          description: 'true / false' })
      @IsBoolean()
      @IsOptional()
      @Field({ nullable: true }) // <- only if you are using graphql
      readonly isValid: boolean;
    
      @ApiProperty({ 
          example: 3, 
          description: 'Rows in File' })
      @IsNumber()
      @IsOptional()
      @Field({ nullable: true }) // <- only if you are using graphql
      readonly noOfRows?: number;
    
      @ApiProperty({ 
        example: '2022-05-11 13:47:28.793+00', 
        description: 'Date on which file invoices are parsed latest' 
      })
      @Type(() => Date)
      @IsDate()
      @IsOptional()
      @Field({ nullable: true }) // <- only if you are using graphql
      readonly parsedOn?: Date;
    
      @ApiProperty({ 
        example: 3, 
        description: 'Total number of parsing attempts done so far' })
      @IsNumber()
      @IsOptional()
      @Field({ nullable: true }) // <- only if you are using graphql
      readonly parseAttempts?: number;
    
      @ApiProperty({ 
        example: FileParseStatus.failure, 
        description: 'failure / success' 
      })
      @IsEnum(FileParseStatus)
      @Field({ nullable: true })
      @IsOptional()
      readonly parseStatus?: FileParseStatus;
    
      @ApiProperty({ 
        example: 'last parsing failed because ...', 
        description: 'parsing failure reason' })
      @IsString()
      @IsOptional()
      @Field({ nullable: true }) // <- only if you are using graphql
      readonly statusComment?: string;
}
