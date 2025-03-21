import { Field, Input, Textarea } from "@chakra-ui/react";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  required?: boolean;
  error?: string;
  invalid?: boolean;
  textArea?: boolean;
};

export const CustomInput = ({
  label,
  name,
  value,
  onChange,
  required,
  error,
  invalid,
  textArea,
}: Props) => {
  const InputComponent = textArea ? Textarea : Input;

  return (
    <Field.Root key={name} invalid={invalid} required={required}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <InputComponent name={name} value={value} onChange={onChange} />
      {invalid && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
