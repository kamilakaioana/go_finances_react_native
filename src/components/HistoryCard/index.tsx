import React from "react";
import { formatCurrency } from "../../Utils";
import { Container, Title, Amount } from "./styles";

interface IHistoryCardProps {
  color: string;
  title: string;
  amount: number;
}

const HistoryCard: React.FC<IHistoryCardProps> = ({ color, title, amount }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{formatCurrency(amount)}</Amount>
    </Container>
  );
};

export default HistoryCard;
