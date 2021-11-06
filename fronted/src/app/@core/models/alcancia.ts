import { TipoMoneda } from "./tipo-moneda";

export interface Alcancia {

  id: number;

  tipoMoneda: TipoMoneda;

  createdAt: string;

  updatedAt: string;

  deletedAt: string;
}
