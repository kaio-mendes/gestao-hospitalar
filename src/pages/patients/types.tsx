export type Professional = {
  id: number;
  name: string;
  tipo: string;
  setor: string;
};

export type Paciente = {
  id: number;
  nome: string;
  medicoresponsavelId: number;
  observacao?: string;
  medicoResponsavel?: {
    id?: number;
    name: string;
  };
};
