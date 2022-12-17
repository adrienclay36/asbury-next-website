import React, { useState } from 'react'
import styles from './contact-form.module.css';
import { TextInput, Textarea } from '@mantine/core';
import AsburyButton from '../ui/AsburyButton';
import { sendMail } from '../../utils/send-email-functions';
import UIModal from '../ui/modal/UIModal';
const adminList = "asbury-webmaster@asburyabq.org, officeadmin@asburyabq.org, familylife@asburyabq.org, librarian@asburyabq.org, revjoe@asburyabq.org";
const testList = "adrienclay36@gmail.com, asbury-webmaster@asburyabq.org";
const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
        const messageContent = `
        <p>You have received a new message via Asbury's contact form.</p>
        <p><strong>Sender Name: </strong>${name}</p>
        <p><strong>Sender Email: </strong>${email}</p>
        <p><strong>Subject: </strong>${subject}</p>
        <p><strong>Message: </strong></p>
        </p>${message}</p>
        <p>You can reply to this message by clicking <a href="mailto:${email}?subject=RE: ${subject}"><strong>here</strong></a>
        `

        await sendMail(
          adminList,
          subject,
          messageContent
        );
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setLoading(false);
        setSuccess(true);
    }


  return (
    <div className="container w-full lg:w-2/6 md:w-6/12 shadow-lg rounded-lg border-2 p-6">
      <UIModal centerModal={true} type="success" message="We have received your message! We will get in touch with you soon. Thanks for contacting us!" opened={success} onClose={() => setSuccess(false)} />
      <form onSubmit={submitHandler}>
        <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-between">
          <div className="flex flex-1 flex-col">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              required
              className="w-11/12"
              max="75"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              required
              className="w-11/12"
              max="75"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <TextInput
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            label="Subject"
            required
            max="80"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            required
            maxLength={5000}
            minRows={8}
          />
        </div>
        <div className="text-center mt-4">
          <AsburyButton loading={loading} text="Submit" />
        </div>
      </form>
    </div>
  );
}

export default ContactForm