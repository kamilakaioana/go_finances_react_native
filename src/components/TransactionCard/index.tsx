import React from "react";
import { formatCurrency, formatDate } from "../../Utils";
import { categories } from "../../Utils/categories";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export interface TransactionCardProps {
  type: "up" | "down";
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

const TransactionCard: React.FC<Props> = ({ data }) => {
  const findCategory = categories.filter(
    (item) => item.key === data.category
  )[0];
  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === "down" && "- "}
        {formatCurrency(data.amount)}
      </Amount>

      <Footer>
        <Category>
          <Icon name={findCategory.icon} />
          <CategoryName>{findCategory.name}</CategoryName>
        </Category>
        <Date>{data.date ? formatDate(data.date) : ""}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
