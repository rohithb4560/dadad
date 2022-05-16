import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from '@modules/user/database/user.repository';
//import { FindUsersQuery } from './find-users.query';
//import { FindUsersRequest } from './find-users.request.dto';
import { GetPendingFilesQuery } from './get-pending-files.query';
import { FileRepository } from '../../database/file.repository';
import { GetpendingFileResponse } from '../../dtos/get-pending-files.response.dto';
import { GetpendingFilesRequest } from './get-pending-query.request.dto';
import { UserEntity } from '@src/modules/user/domain/entities/user.entity';
import { FileEntity } from '../../domain/entities/file.entity';

@Resolver()
export class FindPendingFilesGraphqlResolver {
  constructor(private readonly fileRepo: FileRepository) {}

  @Query(() => [GetpendingFileResponse])
  async findUsers(
    @Args('input') input: GetpendingFilesRequest,
  ): Promise<GetpendingFileResponse[]> {
    const query = new GetPendingFilesQuery(input);
    const files = await this.fileRepo.findFiles(query);

    return files.map((file) => new GetpendingFileResponse(file));
  }
}
