import { DataListProps } from "../screens/DashBoard";

export const formatCurrency = (value: number): string => {
  return value
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace("R$", "R$ ");
};

export const formatDate = (date: string): string => {
  if (!date) return "";
  const resultado = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
  return resultado;
};

export const getLastTransactionDate = (
  collections: DataListProps[],
  type: "up" | "down"
) => {
  if (!collections) return;
  const date = new Date(
    Math.max.apply(
      Math,
      collections
        .filter((transaction: DataListProps) => transaction.type === type)
        .map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
    )
  );
  return `Última ${
    type === "up" ? "entrada" : "saída"
  } dia ${date.getDate()} de ${date.toLocaleString("pt-br", {
    month: "long",
  })}`;
};
