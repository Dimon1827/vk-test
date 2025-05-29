import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import columns from '../../data/columns';
import styles from './Table.module.scss';
import Form from '../Form/Form';
import axios, { AxiosError } from 'axios';

import type { IUser } from '../../types';
const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      setIsLoading(true);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>Users</div>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Add new user
      </button>
      <table cellSpacing={0} className={styles.table}>
        <tr className={styles.row}>
          {isLoading ? (
            columns.map((column, index) => {
              return (
                <th className={styles.tableTitle} key={index}>
                  {column}
                </th>
              );
            })
          ) : (
            <p>Загружаются данные</p>
          )}
        </tr>
        {users.map((user) => {
          return (
            <tr key={user.id} className={styles.row}>
              {columns.map((column, index) => {
                return (
                  <td className={styles.cell} key={index}>
                    {user[column]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      {isOpen && document.getElementById('portal')
        ? createPortal(
            <Form isOpen={isOpen} onClose={() => setIsOpen(false)} />,
            document.getElementById('portal')!
          )
        : null}
    </div>
  );
};

export default Table;
