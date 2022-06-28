import React from "react";
import parse from "html-react-parser";
import AsburyButton from "../../ui/AsburyButton";
import { useRouter } from "next/router";

const ScheduleView = () => {
  const router = useRouter();

  const linkToCoordinator = () => {
    router.push("");
  };
  return (
    <div>
      <div className="text-center my-6">
        <a
          href="https://c0abi487.caspio.com/dp/eb2a500084270df956ed4da68402"
          rel="noreferrer"
          target="_blank"
        >
          <AsburyButton text="Coordinator Sign-In" />
        </a>
      </div>
      <p className="text-center text-lg mt-4">
        Select a date below to search the existing schedule for the Cafe
      </p>
      <div className="container w-full lg:w-full md:w-full mt-6">
        <iframe
          name="Print Schedules"
          title="Print Schedules"
          src="https://c0abi487.caspio.com/dp/eb2a50009efac7a29ed049cdb60a"
        >
          Sorry, but your browser does not support frames.
        </iframe>
      </div>
    </div>
  );
};

export default ScheduleView;
