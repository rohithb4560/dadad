import { TypeormUnitOfWork } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';
import { WalletRepository } from '@modules/wallet/database/wallet.repository';
import { Injectable } from '@nestjs/common';
import { ConfigurationRepository } from '@src/modules/configuration/database/configuration.repository';
import { ConfigurationOrmEntity } from '@src/modules/configuration/database/configuration.orm-entity';
import { FileRepository } from '@src/modules/file/database/file.repository';
import { FileOrmEntity } from '@src/modules/file/database/file.orm-entity';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  // Add new repositories below to use this generic UnitOfWork

  // Convert TypeOrm Repository to a Domain Repository
  getUserRepository(correlationId: string): UserRepository {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getWalletRepository(correlationId: string): WalletRepository {
    return new WalletRepository(
      this.getOrmRepository(WalletOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getConfigurationRepository(correlationId: string): ConfigurationRepository {
    return new ConfigurationRepository(
        this.getOrmRepository(ConfigurationOrmEntity, correlationId),
      ).setCorrelationId(correlationId);
    }

  getFileRepository(correlationId: string): FileRepository {
    return new FileRepository(
      this.getOrmRepository(FileOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
