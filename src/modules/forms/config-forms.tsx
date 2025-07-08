import type { JSX, SetStateAction } from 'react';
import type React from 'react';
import { CreateBeds } from './adm-forms/create-Room-form';
import { CreateWorker } from './adm-forms/create-worker-form';
import { CreateSector } from './adm-forms/create-sector-form';
import { ManageUsers } from './adm-forms/manage-users';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

export const ConfigForms: React.FC<Form> = ({ form, setForm }) => {
  const renderForms: Record<string, JSX.Element> = {
    Leitos: <CreateBeds form={form} setForm={setForm} />,
    Profissionais: <CreateWorker form={form} setForm={setForm} />,
    Setores: <CreateSector form={form} setForm={setForm} />,
    Usuarios: <ManageUsers form={form} setForm={setForm} />,
  };

  return renderForms[form] ?? null;
};
