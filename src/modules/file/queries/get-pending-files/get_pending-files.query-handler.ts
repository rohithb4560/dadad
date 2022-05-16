import { UserRepository } from '@modules/user/database/user.repository';
import { QueryHandlerBase } from '@src/libs/ddd/domain/base-classes/query-handler.base';
import { QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts/dist';
import { FileRepository } from '../../database/file.repository';
import { GetPendingFilesQuery } from './get-pending-files.query';
//import { FindUsersQuery } from './find-users.query';
//import { UserEntity } from '../../domain/entities/user.entity';
import { FileEntity } from '../../domain/entities/file.entity';

@QueryHandler(GetPendingFilesQuery)
export class GetpendingFilesQueryHandler extends QueryHandlerBase {
  constructor(private readonly fileRepo: FileRepository) {
    super();
  }

  /* Since this is a simple query with no additional business
     logic involved, it bypasses application's core completely 
     and retrieves users directly from a repository.
   */
  async handle(query: GetPendingFilesQuery): Promise<Result<FileEntity[], Error>> {
    const users = await this.fileRepo.findFiles(query);
    return Ok(users);
  }
}
