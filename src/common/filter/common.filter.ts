import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class CommonFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
