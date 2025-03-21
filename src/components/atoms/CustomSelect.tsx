import {
  SelectLabel,
  SelectRoot,
  Field,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  ListCollection,
} from "@chakra-ui/react";
import { ComponentProps } from "react";

type Props = {
  label: string;
  name: string;
  collection: ListCollection<{ label: string; value: string }>;
  onChange: (e: { target: { name: string; value: string } }) => void;
  value?: string[];
  required?: boolean;
  error?: string;
  invalid?: boolean;
} & Pick<ComponentProps<typeof SelectRoot>, "width" | "value">;

export const CustomSelect = ({
  value,
  collection,
  label,
  name,
  onChange,
  required,
  error,
  invalid,
  width = "320px",
}: Props) => {
  return (
    <SelectRoot
      name={name}
      collection={collection}
      width={width}
      value={value}
      onValueChange={({ value }) =>
        onChange({ target: { name, value: value[0] } })
      }
      required={required}
      invalid={invalid}
    >
      <SelectLabel>
        {label} <Field.RequiredIndicator />
      </SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Selecciona la Categoría" />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((item) => (
          <SelectItem item={item} key={item.label}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
      {invalid && <Field.ErrorText>{error}</Field.ErrorText>}
    </SelectRoot>
  );
};
