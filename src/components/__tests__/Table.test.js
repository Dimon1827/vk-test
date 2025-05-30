import axios from 'axios';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../Table/Table';
import React, { useState } from 'react';

jest.mock('axios');

const mockUsers = [
  {
    id: '1',
    surname: 'Nelson',
  },
  {
    id: '2',
    surname: 'King',
  },
];

describe('Table', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data correctly', async () => {
    axios.get.mockResolvedValue({ data: { data: mockUsers } });
    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText('Nelson')).toBeInTheDocument();
      expect(screen.getByText('King')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users', {
      params: {
        _page: 1,
        _per_page: 50,
      },
    });
  });
  it('should"t fetch data after when hasMore is false', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: mockUsers,
        next: null,
      },
    });

    render(<Table />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    const tableContainer = screen.getByTestId('table-container');
    fireEvent.scroll(tableContainer, {
      target: { scrollY: 1000 },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
  it('should setIsOpen have true when button click ', async () => {
    axios.get.mockResolvedValue({ data: { data: mockUsers } });
    const setIsOpen = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((initialState) => {
      if (initialState === false) {
        return [false, setIsOpen];
      }
      return useState(initialState);
    });
    render(<Table />);

    const button = screen.getByText('Add new user');
    fireEvent.click(button);

    await waitFor(() => {
      expect(setIsOpen).toHaveBeenCalledWith(true);
    });
  });
  it('displays an error message when fetchData fails', async () => {
    axios.get.mockRejectedValue(new Error('Не удалось получить данные'));

    render(<Table />);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'Ошибка: Не удалось получить данные'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
