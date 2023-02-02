import React from "react";
import { FlatList } from "react-native";
import Button from "../../components/Forms/Button";

import { categories } from "../../Utils/categories";
import { StringResources } from "../../Utils/stringResources";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

interface Category {
  key: string;
  name: string;
}
interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<Props> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  const handleCategorySelect = (category: Category) => {
    setCategory(category);
  };
  return (
    <Container>
      <Header>
        <Title>{StringResources.CATEGORIA}</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title={StringResources.BUTTONS.SELECIONAR}
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  );
};

export default CategorySelect;
