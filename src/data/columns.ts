import type { IUser } from '../types';

const columns: Exclude<keyof IUser, 'id'>[] = [
  'name',
  'surname',
  'age',
  'email',
  'gender',
  'city',
];

export default columns;
