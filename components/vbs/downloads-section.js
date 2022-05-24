import React, { useState } from "react";
import { Tabs } from "@mantine/core";
import DownloadItem from "./download-item";

const VBSDownloadsSection = ({ data1, data2 }) => {
  const [activeTab, setActiveTab] = useState("2021");
  return (
    <Tabs
        color="teal"
      className="mt-6"
      position="center"
      styles={{
        tabLabel: {
          fontSize: 22,
          margin: 30,
          fontFamily: "Red Hat Display",
          fontWeight: 600,
        },
        
      }}
      active={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.Tab label="2021" tabKey="2021">
        {data1.map(file => (
            <DownloadItem key={file?.name} file={file} year="2021"/>
        ))}
      </Tabs.Tab>
      <Tabs.Tab label="2022" tabKey="2022">
            
        {data2[0]?.name === '.emptyFolderPlaceholder' ? null : data2.map(file => (
            <DownloadItem key={file?.name} file={file} year="2022"/>
        ))}
      </Tabs.Tab>
    </Tabs>
  );
};

export default VBSDownloadsSection;
