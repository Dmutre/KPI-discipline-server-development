import * as uuid from 'uuid';

export class AbstractEntity {
  id: string = uuid.v4();
}
