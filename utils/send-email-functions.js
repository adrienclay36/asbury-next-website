import axios from "axios";
export const sendMail = async (recipientList, subject, message) => {
  try {
    const response = await axios.post("/api/email/send-email", {
      recipientList,
      subject,
      message,
    });
    return { status: "ok" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: response.data.message };
  }
};
