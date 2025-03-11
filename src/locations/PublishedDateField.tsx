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
    console.log(sdk);

    if (!initialDate) {
      const today = new Date().toISOString().split("T")[0];
      sdk.field.setValue(today);
      setDate(today);
    } else {
      setDate(initialDate);
    }
  }, []);

  function changeOnPublishedDaterHandler(sys: any) {
    console.log(sys.publishedAt);

    if (sys.publishedAt) {
      const publishedDate = new Date(sys.publishedAt).toISOString().split("T")[0];
      setDate(publishedDate);
      sdk.field.setValue(publishedDate);
      console.log("Updated to published date:", publishedDate);
    }
  }

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