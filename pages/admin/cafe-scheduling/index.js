import React from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import ScheduleTabs from "../../../components/admin/cafe-scheduling/schedule-tabs";
import ScheduleContextProvider from "../../../store/scheduling-store";
import { supabase } from "../../../supabase-client";
const index = ({ institutions, shift_types, shift_slots, shifts }) => {
  return (
    <AdminLayout>
      <ScheduleContextProvider>
        <ScheduleTabs />
      </ScheduleContextProvider>
    </AdminLayout>
  );
};

export default index;
