import React, { useState } from 'react';
import users from '../../data/users';
import columns from '../../data/columns';
import styles from './Table.module.scss';
import { createPortal } from 'react-dom';
import Form from '../Form/Form';
const Table = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>Users</div>
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
      {createPortal(
        <Form isOpen={isOpen} onClose={() => setIsOpen(false)} />,
        document.getElementById('portal')
      )}
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Add new user
      </button>
    </div>
  );
};

export default Table;
