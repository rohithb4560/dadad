import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { User } from '@src/interface-adapters/interfaces/user/user.interface';
import { ObjectType } from '@nestjs/graphql';
import { PendingFile } from '@src/interface-adapters/interfaces/file/Pending-File.interface';
import { FileEntity } from '../domain/entities/file.entity';
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
import { FileParseStatus } from '../domain/entities/file.parse.status';
import { FileDirection } from '../domain/entities/file.direction';

@ObjectType() // only if you are using graphql
export class GetpendingFileResponse extends ResponseBase implements PendingFile {
  constructor(file: FileEntity) {
    super(file);
    /* Whitelisting returned data to avoid leaks.
       If a new property is added, like password or a
       credit card number, it won't be returned
       unless you specifically allow this.
       (avoid blacklisting, which will return everything
        but blacklisted items, which can lead to a data leak).
    */
    const props = file.getPropsCopy();
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
