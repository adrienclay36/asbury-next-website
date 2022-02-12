import React from "react";
import SectionHeading from "../ui/section-heading";
import ProgramList from "./program-list";
import { supabase } from '../../supabase-client';
import { useRouter } from "next/router";
const ProgramSection = ({ files }) => {
  return (
    <SectionHeading title={"Programs"}>
      <ProgramList files={files}/>
    </SectionHeading>
  );
};

export default ProgramSection;
