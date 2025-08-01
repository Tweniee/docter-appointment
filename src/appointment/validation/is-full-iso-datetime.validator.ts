import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFullIsoDateTimeString', async: false })
export class IsFullIsoDateTimeString implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    // Matches full ISO format like 2025-08-01T10:00:00 or 2025-08-01T10:00:00Z
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z)?$/.test(value);
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Must be a full ISO date-time string with both date and time';
  }
}
