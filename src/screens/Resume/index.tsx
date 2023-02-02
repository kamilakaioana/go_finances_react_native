import React, { useEffect, useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import { StringResources } from "../../Utils/stringResources";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MothSelect,
  MothSelectButton,
  MothSelectButtonIcon,
  Month,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../Utils/categories";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { RESUMO_POR_CATEGORIA } = StringResources;

type CategoryType = {
  key: string;
  name: string;
  total: number;
  color: string;
  percent: string;
};

const Resume: React.FC = () => {
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryType[]>();
  async function loadData() {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response != null ? JSON.parse(response) : [];

    const cashOut: TransactionCardProps[] = responseFormatted.filter(
      (item: TransactionCardProps) => item.type === "down"
    );

    const cashOutTotal = cashOut.reduce(
      (acumullator: number, currenty: TransactionCardProps) => {
        return acumullator + currenty.amount;
      },
      0
    );

    let totalByCategory: CategoryType[] = [];

    categories.forEach((category) => {
      let categorySum: CategoryType["total"] = 0;
      cashOut.forEach((cashOut: TransactionCardProps) => {
        if (cashOut.category === category.key) {
          categorySum += cashOut.amount;
        }
      });

      if (categorySum > 0) {
        const percent = `${((categorySum / cashOutTotal) * 100).toFixed(0)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{RESUMO_POR_CATEGORIA}</Title>
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MothSelect>
          <MothSelectButton>
            <MothSelectButtonIcon name="chevron-left" />
          </MothSelectButton>

          <Month>Maio</Month>

          <MothSelectButton>
            <MothSelectButtonIcon name="chevron-right" />
          </MothSelectButton>
        </MothSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories?.map((category) => category.color)}
            x="percent"
            y="total"
            labelRadius={90}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
          />
        </ChartContainer>

        {totalByCategories?.map((item) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            title={item.name}
            amount={item.total}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
