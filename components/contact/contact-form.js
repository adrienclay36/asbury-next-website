import React, { useState } from 'react'
import styles from './contact-form.module.css';
const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        
    }


  return (
    <div className="container w-full lg:w-2/6 md:w-6/12 shadow-lg rounded-lg border-2 p-6">
      <form onSubmit={submitHandler}>
        <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-between">
          <div className="flex flex-1 flex-col">
            <label className="mb-4" htmlFor="name">
              Name <span className="text-red-800">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="appearance-none mb-4 rounded-md relative block w-full lg:w-11/12 md:w-11/12 px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-seaFoam-500 focus:border-seaFoam-500 focus:z-10 sm:text-sm"
              type="text"
              required
              placeholder="Full Name"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label className="mb-4" htmlFor="email">
              Email <span className="text-red-800">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className={styles.input}
              type="email"
              required
              placeholder="Email Address"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <label className="mb-4" htmlFor="subject">
            Subject <span className="text-red-800">*</span>
          </label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id="subject"
            className={styles.input}
            type="text"
            required
            placeholder="Subject Line"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <label className="mb-4" htmlFor="content">
            Message <span className="text-red-800">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="content"
            className={styles.input}
            type="text"
            required
            placeholder="Enter your message here."
            rows="10"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-3 py-2 bg-seaFoam-600 rounded-lg text-white font-semibold text-center shadow-lg"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm