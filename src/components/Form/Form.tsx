import React from 'react';
import styles from './Form.module.scss';
import users from '../../data/users';
import columns from '../../data/columns';

const Form = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Добавление пользователя</h1>
      {columns.map((column, index) => {
        return (
          <fieldset className={styles.inputWrapper} key={index}>
            <label className={styles.label} htmlFor={column}>
              {column}
            </label>
            <input
              className={styles.input}
              id={column}
              type="text"
              placeholder={column}
            />
          </fieldset>
        );
      })}
      <button className={styles.button} onClick={onClose}>
        Закрыть
      </button>
    </form>
  );
};

export default Form;
