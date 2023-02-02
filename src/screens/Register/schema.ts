import * as Yup from "yup";
import { StringResources } from "../../Utils/stringResources";

const {
  NOME_OBRIGATORIO,
  INFOME_VALOR_NUMERICO,
  VALOR_NAO_PODE_SER_NEGATIVO,
  VALOR_OBRIGATORIO,
} = StringResources.ERROS;

export const schema = Yup.object().shape({
  name: Yup.string().required(NOME_OBRIGATORIO),
  amount: Yup.number()
    .typeError(INFOME_VALOR_NUMERICO)
    .positive(VALOR_NAO_PODE_SER_NEGATIVO)
    .required(VALOR_OBRIGATORIO),
});
