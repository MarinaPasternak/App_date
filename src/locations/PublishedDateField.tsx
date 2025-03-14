import { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { Datepicker } from "@contentful/f36-components";

const PublishedDateField = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [date, setDate] = useState<string>("");
  
  useEffect(() => {
    sdk.window.updateHeight(420);
    const initialDate = sdk.field.getValue() as string | undefined;

    if (!initialDate) {
      const today = new Date().toISOString().split("T")[0];
      sdk.field.setValue(today);
      setDate(today);
    } else {
      setDate(initialDate);
    }
  }, []);
  
  return (
    <Datepicker
      dateFormat="dd.MM.yyyy"
      selected={date ? new Date(date) : undefined}
      onSelect={setDate}
      style={{ width: "250px" }}
    />
  );
};

export default PublishedDateField;
