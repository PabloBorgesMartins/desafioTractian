import { ValidationError } from 'yup';

export default function getValidationErrors(err: ValidationError){
  return err.errors;
}