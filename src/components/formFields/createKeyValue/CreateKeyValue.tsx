import * as React from "react";
import * as styles from "./CreateKeyValue.module.css";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IReactHookFormProps } from "../types";
import { IInputProps } from "../input";
import { Button } from "@gemeente-denhaag/components-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gemeente-denhaag/table";

/**
 * Export KeyValue input component (wrapped in FormFieldGroup)
 */
interface CreateKeyValueProps {
  control: Control<FieldValues, any>;
  defaultValue?: IKeyValue[];
}

interface IKeyValue {
  key: string;
  value: string;
}

export const CreateKeyValue: React.FC<CreateKeyValueProps & IInputProps & IReactHookFormProps> = ({
  name,
  errors,
  control,
  validation,
  defaultValue,
}) => {
  return (
    <Controller
      {...{ control, name, errors }}
      rules={validation}
      render={({ field: { onChange } }) => {
        return <KeyValueComponent handleChange={onChange} {...{ defaultValue, errors }} />;
      }}
    />
  );
};

/**
 * Internal KeyValueComponent (contains all required logic)
 */
interface CreateKeyValueComponentProps {
  defaultValue?: IKeyValue[];
  handleChange: (...event: any[]) => void;
}

const KeyValueComponent: React.FC<CreateKeyValueComponentProps> = ({ defaultValue, handleChange }) => {
  const [currentKey, setCurrentKey] = React.useState<string>("");
  const [currentValue, setCurrentValue] = React.useState<string>("");
  const [keyValues, setKeyValues] = React.useState<IKeyValue[]>(defaultValue ?? []);

  const currentKeyRef = React.useRef(null);
  const currentValueRef = React.useRef(null);

  const handleCreate = (): void => {
    const keyValue: IKeyValue = { key: currentKey, value: currentValue };

    setCurrentKey("");
    setCurrentValue("");

    setKeyValues([...keyValues, keyValue]);
  };

  React.useEffect(() => {
    defaultValue && setKeyValues(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    handleChange(keyValues);
  }, [keyValues]);

  return (
    <div className={styles.keyValue}>
      {keyValues && (
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableHeader>Key</TableHeader>
              <TableHeader>Value</TableHeader>
              <TableHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {keyValues.map((keyValue, idx) => (
              <TableRow className={styles.row} key={`${keyValue}${idx}`}>
                <TableCell>{keyValue.key}</TableCell>
                <TableCell>{keyValue.value}</TableCell>
                <TableCell className={styles.tdDelete}>
                  <Button onClick={() => setKeyValues(keyValues.filter((_keyValue) => _keyValue !== keyValue))}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Key"
          value={currentKey}
          ref={currentKeyRef}
          className="denhaag-textfield__input"
          onChange={(e) => setCurrentKey(e.target.value)}
        />

        <input
          type="text"
          placeholder="Value"
          value={currentValue}
          ref={currentValueRef}
          className="denhaag-textfield__input"
          onChange={(e) => setCurrentValue(e.target.value)}
        />

        <Button onClick={handleCreate} disabled={!currentKey || !currentValue}>
          Add
        </Button>
      </div>
    </div>
  );
};
