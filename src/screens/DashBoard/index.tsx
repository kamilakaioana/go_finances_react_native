import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  LogoutButton,
  ContainerLoader,
} from "./styles";
import { formatCurrency, getLastTransactionDate } from "../../Utils";
import theme from "../../global/styles/theme";
import { StringResources } from "../../Utils/stringResources";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

type HighlightCardsProps = {
  amount: number;
  lastTrasaction: string;
};

interface IHighlightCards {
  cashEntry: HighlightCardsProps;
  cashOut: HighlightCardsProps;
  total: HighlightCardsProps;
}

const DashBoard: React.FC = () => {
  const { SAIDA, ENTRADA, TOTAL, SAUDACAO, LISTAGEN } = StringResources;
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightCards, setHighlightCards] = useState<IHighlightCards>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function loadTransactions() {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response != null ? JSON.parse(response) : [];
    setData(transactions);

    let cashEntry: number = 0;
    let cashOut: number = 0;

    transactions.map((transaction: DataListProps) => {
      transaction.type === "up"
        ? (cashEntry += transaction.amount)
        : (cashOut += transaction.amount);
    });

    const transactionCashEntry = getLastTransactionDate(transactions, "up");
    const transactionCashOut = getLastTransactionDate(transactions, "down");
    const totalInterval = transactionCashOut?.replace(
      "Última saída dia",
      "01 à"
    );

    const totalValues = cashEntry - cashOut;

    setHighlightCards({
      cashEntry: {
        amount: cashEntry,
        lastTrasaction: transactionCashEntry ?? "",
      },
      cashOut: {
        amount: cashOut,
        lastTrasaction: transactionCashOut ?? "",
      },
      total: {
        amount: totalValues,
        lastTrasaction: totalInterval ?? "",
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <ContainerLoader>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </ContainerLoader>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/50750571?s=400&u=27b39e589621e00d9f482898cf7a4569a1eb1589&v=4",
                  }}
                />
                <User>
                  <UserGreeting>{SAUDACAO}</UserGreeting>
                  <UserName>Kamila</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title={ENTRADA}
              amount={formatCurrency(highlightCards?.cashEntry.amount ?? 0)}
              lastTransaction={highlightCards?.cashEntry.lastTrasaction ?? ""}
            />
            <HighlightCard
              type="down"
              title={SAIDA}
              amount={formatCurrency(highlightCards?.cashOut.amount ?? 0)}
              lastTransaction={highlightCards?.cashOut.lastTrasaction ?? ""}
            />
            <HighlightCard
              type="total"
              title={TOTAL}
              amount={formatCurrency(highlightCards?.total.amount ?? 0)}
              lastTransaction={highlightCards?.total.lastTrasaction ?? ""}
            />
          </HighlightCards>

          <Transactions>
            <Title>{LISTAGEN}</Title>

            <TransactionList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default DashBoard;
