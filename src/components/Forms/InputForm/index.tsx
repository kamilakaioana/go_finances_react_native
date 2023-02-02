import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Container, ErrorMessage } from "./styles";
import { Input } from "../Input";

// type Props = TextInputProps;
interface Props extends TextInputProps {
  control: Control;
  name: string;
  Error: string;
}

export const InputForm: React.FC<Props> = ({
  control,
  name,
  Error,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {ErrorMessage && <ErrorMessage>{Error}</ErrorMessage>}
    </Container>
  );
};

export default Input;
