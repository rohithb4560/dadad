import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { FileEntity, FileProps } from '../domain/entities/file.entity';

export interface FileRepositoryPort
  extends RepositoryPort<FileEntity, FileProps> {
    findOneByIdOrThrow(id: string): Promise<FileEntity>;
    exists(id: string): Promise<boolean>;
}