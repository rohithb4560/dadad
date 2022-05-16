import { ExceptionBase } from '@src/libs/exceptions';

export class ConfigurationAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Configuration already exists';

  public readonly code = 'CONFIGURATION.ALREADY_EXISTS';

  constructor(metadata?: unknown) {
    super(ConfigurationAlreadyExistsError.message, metadata);
  }
}