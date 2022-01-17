import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGS, AVAILABLE_SYSTEM_LANGS, DEFAULT_SYSTEM_LANG } from 'Constants';
import { useDispatchedActions } from 'Hooks';
import { todoSlice } from 'Redux/todo/todoSlice';

const LngComponent: FC = (): JSX.Element => {
  const { t } = useTranslation();

  const { setCurrentLanguage } = useDispatchedActions({
    setCurrentLanguage: todoSlice.actions.setCurrentLanguage,
  });

  const renderAvilableLangs = (): JSX.Element[] =>
    AVAILABLE_LANGS.map(({ value, name }) => <option value={value}>{t(name)}</option>);

  const handleChangeLanguage = (e: any): void => {
    setCurrentLanguage(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <select
        className="custom-select"
        id="inputGroupSelect02"
        defaultValue={DEFAULT_SYSTEM_LANG}
        onChange={handleChangeLanguage}
      >
        {renderAvilableLangs()}
      </select>
      <div className="input-group-append">
        <label className="input-group-text" htmlFor="inputGroupSelect02">
          {t('inf_active_language')}
        </label>
      </div>
    </div>
  );
};

export default LngComponent;
