import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { supabase } from "../../../supabase-client";
import PageLoading from "../../../components/PageLoading/PageLoading";
import VBSList from "../../../components/admin/vbs/vbs-list";
import { Tabs } from "@mantine/core";
import { FaChild, FaHandHoldingHeart } from "react-icons/fa";
import AsburyButton from "../../../components/ui/AsburyButton";
import { CSVLink } from "react-csv";
import { checkAdmin } from "../../../supabase-util";
const VBSRegistrationHistory = () => {
  const [childRegister, setChildRegister] = useState();
  const [volunteers, setVolunteers] = useState();

  const getRegistrants = async () => {
    const { data: childrenData, error: childrenError } = await supabase
      .from("vbs_children")
      .select().order("created_at", { ascending: true });
    if (childrenError) {
      console.log(
        "Error getting children registrants:: ",
        childrenError.message
      );
    }
    if (childrenData) {
      let formattedRows = [];
      childrenData.forEach((row) => {
        row["created_at"] = new Date(row["created_at"]).toLocaleDateString();
        row["agree_to_media"] = row["agree_to_media"] ? "Yes" : "No";
        formattedRows.push(row);
      });
      setChildRegister(formattedRows);
    }

    const { data: volunteerData, error: volunteerError } = await supabase
      .from("vbs_volunteer")
      .select().order("created_at", { ascending: true });
    if (volunteerError) {
      console.log(
        "Error getting data for volunteers:: ",
        volunteerError.message
      );
    }
    if (volunteerData) {
      let formattedVolunteers = [];
      volunteerData.forEach((row) => {
        for (let key in row) {
          if (typeof row[key] === "boolean") {
            row[key] = row[key] ? "Yes" : "No";
          }
        }
      });
      setVolunteers(volunteerData);
    }
  };

  useEffect(() => {
    getRegistrants();
  }, []);

  if (!childRegister || !volunteers) {
    return (
      <AdminLayout>
        <PageLoading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className=" w-11/12 lg:w-5/6 md:w-11/12 mx-auto">
        <Tabs color="cyan" position="center">
          <Tabs.Tab label="Children Registrants" icon={<FaChild size={14} />}>
            <div className="flex flex-1 justify-center items-center">
              <CSVLink
                className="text-white bg-emerald-900 hover:bg-emerald-800 mt-12 p-2 rounded-md font-semibold"
                data={childRegister}
                filename="child-register.csv"
              >
                Download CSV
              </CSVLink>
            </div>
            <VBSList
              href={"/admin/vbs/edit-child-registrant"}
              registrants={childRegister}
            />
          </Tabs.Tab>
          <Tabs.Tab label="Volunteers" icon={<FaHandHoldingHeart size={14} />}>
            <div className="flex flex-1 justify-center items-center">
              <CSVLink
                className="text-white bg-emerald-900 hover:bg-emerald-800 mt-12 p-2 rounded-md font-semibold"
                data={volunteers}
                filename="volunteers.csv"
              >
                Download CSV
              </CSVLink>
            </div>
            <VBSList href="/admin/vbs/edit-volunteer" registrants={volunteers} />
          </Tabs.Tab>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default VBSRegistrationHistory;

export const getServerSideProps = async ({ req, res }) => {
  const authStatus = await checkAdmin(req);
  return authStatus;
};
