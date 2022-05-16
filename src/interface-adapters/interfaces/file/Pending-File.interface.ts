import { ModelBase } from '../../../libs/ddd/interface-adapters/interfaces/model.base.interface';

export interface PendingFile extends ModelBase {
  dataSourceConfigId:string;
}
