import styles from './Form.module.scss';
import columns from '../../data/columns';
import { useFormContext } from 'react-hook-form';
import validFormInformation from './validFormInformation';
import { useState } from 'react';
interface IPropsForm {
  isOpen: boolean;
  onClose: () => void;
}

const Form = ({ isOpen, onClose }: IPropsForm) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useFormContext();

  const [isDataSubmit, setIsDataSubmit] = useState(false);

  if (!isOpen) return null;


  const onSubmit = () => {
    setIsDataSubmit(true);
  } 

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Добавление пользователя</h1>
      {columns.map((column, index) => {
        return (
          <fieldset className={styles.inputWrapper} key={index}>
            <label className={styles.label} htmlFor={column}>
              {column}
            </label>
            <input
              className={styles.input}
              {...register(column, {
                required: validFormInformation[index].required,
                pattern: {
                  value: validFormInformation[index].regex as RegExp,
                  message: `${
                    validFormInformation[index].message
                      ? validFormInformation[index].message
                      : `Ваш ${column} введен неправильно`
                  } `,
                },
                min: {
                  value: validFormInformation[index].min as number,
                  message: `${
                    validFormInformation[index].numberMessage
                      ? validFormInformation[index].numberMessage
                      : ''
                  }`,
                },
                max: {
                  value: validFormInformation[index].max as number,
                  message: `${
                    validFormInformation[index].numberMessage
                      ? validFormInformation[index].numberMessage
                      : ''
                  }`,
                },
              })}
              id={column}
              type={validFormInformation[index].type}
              placeholder={column}
            />
            {errors[column]?.message && (
              <div className={styles.informationError}>
                {errors[column]?.message as string}
              </div>
            )}
          </fieldset>
        );
      })}
      <button type="submit" className={styles.button}>
        Отправить
      </button>
      <button className={styles.button} onClick={onClose}>
        Закрыть
      </button>
      {isDataSubmit && (
        <p className={styles.submitText}>Данные успешно отправлены</p>
      )}
    </form>
  );
};

export default Form;
