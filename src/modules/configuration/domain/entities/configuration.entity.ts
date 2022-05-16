import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

// Properties that are needed for a configuration creation
export interface CreateConfigurationProps {
    enterpriseID: string;
    dataTransferMechanism: string;
    fTPLocation: string;
    fileArrivalCutoff: Date;
    fileFormat: string;
    fileParsingContract: string;
    successFilePath: string;
    failureFilePath: string;
}

// All properties that a configuration has
export interface ConfigurationProps extends CreateConfigurationProps {
}

export class ConfigurationEntity extends AggregateRoot<ConfigurationProps> {
  protected readonly _id: UUID;

  static create(create: CreateConfigurationProps): ConfigurationEntity {
    const id = UUID.generate();
    /* Setting a default role since we are not accepting it during creation. */
    const props: ConfigurationProps = { ...create };
    const user = new ConfigurationEntity({ id, props });
    return user;
  }

  validate(): void {
    // TODO: example
    // entity business rules validation to protect it's invariant
  }
}
