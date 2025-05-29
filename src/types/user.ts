type Sex = 'Male' | 'Female';

export interface IUser {
  id: number;
  name: string;
  surname: string;
  age: string;
  email: string;
  gender: Sex;
  city: string;
}
