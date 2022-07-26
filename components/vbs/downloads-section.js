import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import DownloadItem from "./download-item";

const VBSDownloadsSection = ({ data1, data2 }) => {
  return (
    <Tabs
      color="teal"
      defaultValue="2021"
      
    >
      <Tabs.List position="center" grow>
        <Tabs.Tab value="2021">2021</Tabs.Tab>
        <Tabs.Tab value="2022" tabKey="2022">
          2022
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="2021">
        {data1.map((file) => (
          <DownloadItem key={file?.name} file={file} year="2021" />
        ))}
      </Tabs.Panel>
      <Tabs.Panel value="2022">
        {data2[0]?.name === ".emptyFolderPlaceholder"
          ? null
          : data2.map((file) => (
              <DownloadItem key={file?.name} file={file} year="2022" />
            ))}
      </Tabs.Panel>
    </Tabs>
  );
};

export default VBSDownloadsSection;
