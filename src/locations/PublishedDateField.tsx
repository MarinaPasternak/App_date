import { useEffect, useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";

import { Flex, Box, Button } from "@contentful/f36-components";
import { Datepicker } from "@contentful/f36-components";

import * as contentful from "contentful-management";

const PublishedDateField = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [client, setClient] = useState(null);
  const [environment, setEnvironment] = useState<contentful.Environment | null>(null);

  useEffect(() => {
    const initClient = async () => {
      const newClient = contentful.createClient({
        accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN || "",
      });

      const space = await newClient.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID || "");
      const gotEnviroment = await space.getEnvironment("develop");

      setEnvironment(gotEnviroment);
      setClient(newClient);
    };

    initClient();
  }, []);

  useEffect(() => {
    const initialDate = sdk.field.getValue() ? new Date(sdk.field.getValue()) : undefined;

    if (!initialDate) {
      const today = new Date();
      sdk.field.setValue(today.toISOString());
      setDate(today);
    } else {
      setDate(initialDate);
    }
  }, [sdk]);

  useEffect(() => {
    sdk.window.startAutoResizer({ absoluteElements: true });
  }, [sdk]);

  async function copyEntry() {
    if (!client || !environment) return;
    
    try {
      const response = await fetch(
        `https://api.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/develop/entries/${VITE_CONTENTFUL_FIRST_ENTRY_ID}?access_token=${import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN}`
      );      
      const entryData = await response.json();
      const entryFields = entryData.fields;

      const contentType = 'blogPost'

      const newEntry = await environment.createEntry(contentType, {
          fields: entryFields
      })

      console.log("old entry", entryData.sys.id, entryData);
      console.log("new entry", newEntry.sys.id, newEntry);

    } catch (error) {
      console.error("Error fetching entry:", error);
    }
  }

  return (
    <Flex marginBottom="spacingM" flexDirection="column">
      <Box marginBottom="spacingM" style={{ width: "100%", height: "100%" }}>
        <Datepicker
          dateFormat="dd.MM.yyyy"
          selected={date ? new Date(date) : undefined}
          onSelect={setDate}
          style={{ width: "250px" }}
        />
      </Box>
      <Box marginBottom="spacingM" style={{ width: "100%", height: "100%" }}>
        <Button variant="primary" onClick={copyEntry}>
          Copy first entry
        </Button>
      </Box>
    </Flex>
  );
};

export default PublishedDateField;
