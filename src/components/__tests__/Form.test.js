import {
  findByTestId,
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React, { act } from 'react';
import Form from '../Form/Form';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn((callback) => callback),
    formState: { errors: {} },
  }),
}));

describe('Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('The form should closed when click button', async () => {
    const mockOnClose = jest.fn();

    render(<Form isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByText('Закрыть');

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('The form should be submitted if all the information has been entered', async () => {
    const { getByTestId } = render(<Form isOpen={true} />);
    const form = getByTestId('form');
    const name = screen.getByPlaceholderText('name');
    const surname = screen.getByPlaceholderText('surname');
    const age = screen.getByPlaceholderText('age');
    const email = screen.getByPlaceholderText('email');
    const gender = screen.getByPlaceholderText('gender');
    const city = screen.getByPlaceholderText('city');
    fireEvent.change(name, { target: { value: 'Антон' } });
    fireEvent.blur(name);
    fireEvent.change(surname, { target: { value: 'Иванов' } });
    fireEvent.blur(surname);
    fireEvent.change(age, { target: { value: '35' } });
    fireEvent.blur(age);
    fireEvent.change(email, { target: { value: 'a.drogalov2015@yandex.ru' } });
    fireEvent.blur(email);
    fireEvent.change(gender, {
      target: { value: 'Male' },
    });
    fireEvent.blur(gender);
    fireEvent.change(city, {
      target: { value: 'Moscow' },
    });
    fireEvent.blur(city);
    fireEvent.submit(form);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const successText = screen.getByTestId('submitText');
      expect(successText).toBeInTheDocument();
      expect(successText).toHaveTextContent('Данные успешно отправлены');
    });
  });
});
