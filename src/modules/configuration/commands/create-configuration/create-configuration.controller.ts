import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object';
import { ConflictException } from '@src/libs/exceptions';
import { match, Result } from 'oxide.ts/dist';
import { ConfigurationAlreadyExistsError } from '../../errors/configuration.errors';
import { CreateConfigurationCommand } from './create-configuration.command';
import { CreateConfigurationRequest } from './create-configuration.request.dto';

@Controller(routesV1.version)
export class CreateConfigurationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.configuration.root)
  @ApiOperation({ summary: 'Create a configuration' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ConfigurationAlreadyExistsError.message,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateConfigurationRequest): Promise<IdResponse> {
    const command = new CreateConfigurationCommand(body);

    const result: Result<
      ID,
      ConfigurationAlreadyExistsError
    > = await this.commandBus.execute(command);

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: id => new IdResponse(id.value),
      Err: error => {
        if (error instanceof ConfigurationAlreadyExistsError)
          throw new ConflictException(error.message);
        throw error;
      },
    });
  }
}
