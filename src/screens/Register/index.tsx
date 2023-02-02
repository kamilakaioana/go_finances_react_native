import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import Button from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import CategorySelect from "../CategorySelect";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
import { schema } from "./schema";
import { ScrollView } from "react-native-gesture-handler";
import { StringResources } from "../../Utils/stringResources";

interface FormData {
  name: string;
  amount: number;
}
const Register: React.FC = () => {
  const {
    SELECIONE_TIPO_TRANSACAO,
    SELECIONE_CATEGORIA,
    NAO_FOI_REALIZADO_CADASTRO,
  } = StringResources.ALERTAS;
  const { NOME, PRECO } = StringResources.INPUTS;
  const { ENVIAR } = StringResources.BUTTONS;
  const { CADASTRO } = StringResources;

  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dataKey = "@goFinances:transactions";
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleTransactionsTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) return Alert.alert(SELECIONE_TIPO_TRANSACAO);

    if (category.key === "category") return Alert.alert(SELECIONE_CATEGORIA);

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "categoria",
      });
    } catch (error) {
      console.log(error);
      Alert.alert(NAO_FOI_REALIZADO_CADASTRO);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>{CADASTRO}</Title>
        </Header>
        <ScrollView>
          <Form>
            <Fields>
              <InputForm
                name="name"
                control={control}
                placeholder={NOME}
                autoCapitalize="sentences"
                autoCorrect={false}
                Error={errors.name && errors.name.message}
              />

              <InputForm
                name="amount"
                control={control}
                placeholder={PRECO}
                keyboardType="numeric"
                Error={errors.amount && errors.amount.message}
              />
              <TransactionTypes>
                <TransactionTypeButton
                  type="up"
                  title="income"
                  onPress={() => handleTransactionsTypeSelect("up")}
                  isActive={transactionType === "up"}
                />
                <TransactionTypeButton
                  type="down"
                  title="Outcome"
                  onPress={() => handleTransactionsTypeSelect("down")}
                  isActive={transactionType === "down"}
                />
              </TransactionTypes>
              <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />
            </Fields>

            <Button title={ENVIAR} onPress={handleSubmit(handleRegister)} />
          </Form>
        </ScrollView>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
