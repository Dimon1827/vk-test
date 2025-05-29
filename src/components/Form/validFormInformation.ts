import type { IValid } from '../../types';

const validFormInformation: IValid[] = [
  {
    type: 'text',
    regex: /^[а-яёa-z]{2,24}/i,
    message: 'Ваше имя введено неверно',
    required: 'Введите имя',
  },
  {
    type: 'text',
    regex: /^[а-яёa-z]{2,24}/i,
    message: 'Ваша фамилия введена неверно',
    required: 'Введите фамилию',
  },
  {
    type: 'number',
    required: 'Введите возраст',
    min: 14,
    max: 100,
    numberMessage: 'Ваш возраст должен быть от 14 до 100',
  },
  {
    type: 'text',
    regex: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    message: 'Ваш email введен неверно',
    required: 'Введите email',
  },
  { type: 'text', required: 'Введите пол' },
  {
    type: 'text',
    regex: /^[а-яёa-z]{2,24}/i,
    message: 'Ваш город введен неверно',
    required: 'Введите город',
  },
];

export default validFormInformation;
