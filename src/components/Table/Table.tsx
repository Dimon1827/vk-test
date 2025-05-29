import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import columns from '../../data/columns';
import styles from './Table.module.scss';
import Form from '../Form/Form';
import axios, { AxiosError } from 'axios';
import type { IUser } from '../../types';
import { FormProvider, useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const methods = useForm({
    mode: 'onChange',
  });
  const limit = 50;
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          _page: page,
          _per_page: limit,
        },
      });
      setUsers((prevUsers) => [...prevUsers, ...response.data.data]);
      setPage((prev) => prev + 1);
      if (response.data.next === null) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err as AxiosError);
    }
  };

  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }
  return (
    <FormProvider {...methods}>
      <div className={styles.tableContainer}>
        <div className={styles.header}>Users</div>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          Add new user
        </button>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Загрузка...</h4>}
        >
          <table cellSpacing={0} className={styles.table}>
            <tr className={styles.row}>
              {columns.map((column, index) => {
                return (
                  <th className={styles.tableTitle} key={index}>
                    {column}
                  </th>
                );
              })}
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
        </InfiniteScroll>
        {isOpen && document.getElementById('portal')
          ? createPortal(
              <Form isOpen={isOpen} onClose={() => setIsOpen(false)} />,
              document.getElementById('portal')!
            )
          : null}
      </div>
    </FormProvider>
  );
};

export default Table;
