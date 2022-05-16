import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { removeUndefinedProps } from '@src/libs/utils/remove-undefined-props.util';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
    TypeormRepositoryBase,
    WhereCondition,
  } from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { CreateFileProps, FileEntity, FileProps } from '../domain/entities/file.entity';
import { FileOrmEntity } from './file.orm-entity';
import { FileRepositoryPort } from './file.repository.port';
import { BaseEntityProps } from '@src/libs/ddd/domain/base-classes/entity.base';
import { DeepPartial } from '@src/libs/types';
import { FileOrmMapper } from './file.orm-mapper';
import { NotFoundException } from '@src/libs/exceptions';
import { GetPendingFilesQuery } from '../queries/get-pending-files/get-pending-files.query';


@Injectable()
export class FileRepository
  extends TypeormRepositoryBase<FileEntity, FileProps, FileOrmEntity>
  implements FileRepositoryPort{
    protected prepareQuery(params: DeepPartial<BaseEntityProps & FileProps>): WhereCondition<FileOrmEntity> {
        throw new Error('Method not implemented.');
      }

    protected relations: string[] = [];

    constructor(
    @InjectRepository(FileOrmEntity)
    private readonly FileRepository: Repository<FileOrmEntity>,
    ) {
        super(
            FileRepository,
            new FileOrmMapper(FileEntity, FileOrmEntity),
            new Logger('FileRepository'),
        );
    }
   


    async exists(id: string): Promise<boolean> {
        const found = await this.findOneByFileID(id);
        if (found) {
          return true;
        }
        return false;
      }

    async findOneByIdOrThrow(id: string): Promise<FileEntity> {
        const file = await this.findOneByFileID(id);
        if (!file) {
            throw new NotFoundException(`File with fileId '${id}' not found`);
        }
        return this.mapper.toDomainEntity(file);
    }

    private async findOneByFileID(
        id: string,
      ): Promise<FileOrmEntity | undefined> {
        const file = await this.FileRepository.findOne({
          where: { id },
        });
    
        return file;
      }
   
      async findFiles(query: GetPendingFilesQuery): Promise<FileEntity[]> {
        const where: QueryParams<FileOrmEntity> = removeUndefinedProps(query);
        const Files = await this.repository.find({ where:{ parseStatus:"failure"} });
        return Files.map(file => this.mapper.toDomainEntity(file));
      }
      
    }