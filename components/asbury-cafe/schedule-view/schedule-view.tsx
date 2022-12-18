import React, { useRef } from "react";
import AsburyButton from "../../ui/AsburyButton";
import { useRouter } from "next/router";
import InfoDropdown from '../../ui/info-dropdown/info-dropdown';
import SectionHeading from "../../ui/section-heading";
const ScheduleView = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-11/12 lg:w-4/6 mx-auto items-start">
        <InfoDropdown
          title={"Coordinator Sign In"}
          buttonText="Sign In"
          href="https://c0abi487.caspio.com/dp/eb2a50002a387c33d89944eba2b6"
          content="Sign In as a coordinator to work on the Asbury Cafe schedule."
        />

        <InfoDropdown
          title="Coordinator Registration"
          buttonText="Register"
          href="https://c0abi487.caspio.com/dp/eb2a5000095791f32aae45e08424"
          content="Sign Up here if you were designated as a coordinator for the Asbury Pie Cafe"
        />
      </div>
      <div className="w-11/12 lg:w-2/6 md:w-4/6 mx-auto mb-12">
        <InfoDropdown
          title="Forgot Password?"
          buttonText="Reset Password"
          href="https://c0abi487.caspio.com/dp/eb2a500034d721ee5f8b40bca52f"
          content="Follow the below link to reset your password. It will require your username and email"
        />
      </div>
      <div className="text-center">
        <AsburyButton
          onClick={() =>
            videoRef.current!.scrollIntoView({ behavior: "smooth" })
          }
          text="Pie Cafe Training Video"
        />
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
      <SectionHeading reactRef={videoRef} title="Pie Cafe Training Video">
        <div className="container w-full">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/_ElHpZ52wbg"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </SectionHeading>
    </div>
  );
};

export default ScheduleView;
