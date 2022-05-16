import { ExceptionBase } from '@src/libs/exceptions';

export class FileAlreadyExistsError extends ExceptionBase {
    static readonly message: 'File already exists';
  
    public readonly code = 'FILE.ALREADY_EXISTS';
  
    constructor(metadata?: unknown) {
      super(FileAlreadyExistsError.message, metadata);
    }
   
  }
  export class FileNotExistsError extends ExceptionBase {
    static readonly message: 'File does not exists';
  
    public readonly code = 'FILE.NOT_EXISTS';
  
    constructor(metadata?: unknown) {
      super(FileNotExistsError.message, metadata);
    }
  }