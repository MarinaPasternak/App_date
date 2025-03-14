import { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";

import { Flex, Box } from '@contentful/f36-components';
import { Datepicker } from "@contentful/f36-components";

const PublishedDateField = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  useEffect(() => {
    const initialDate = new Date(sdk.field.getValue()) as Date | undefined;

    if (!initialDate) {
      const today = new Date();
      sdk.field.setValue(today);
      setDate(today);
    } else {
      setDate(initialDate);
    }
  }, []);

  useEffect(() => {
    sdk.window.startAutoResizer({ absoluteElements: true });
  });
  
  return (
      <Flex 
        marginBottom="spacingM" 
        flexDirection="column" 
      >
      <Box 
        marginBottom="spacingM"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Datepicker
            dateFormat="dd.MM.yyyy"
            selected={date ? new Date(date) : undefined}
            onSelect={setDate}
            style={{ width: "250px" }}
        />
      </Box>
    </Flex>
  );
};

export default PublishedDateField;
