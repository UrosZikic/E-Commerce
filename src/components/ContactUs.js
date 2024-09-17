import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sxnbe4j",
        "template_041id5q",
        form.current,
        "K2PSUkRlxwE8wR98m"
      )
      .then(
        (result) => {
          // console.log(result.text);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <h2>Get in touch</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="user_name">Name</label>
        <input type="text" name="user_name" id="user_name" required />
        <label htmlFor="user_email">Email</label>
        <input type="email" name="user_email" id="user_email" required />
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" required />
        <label htmlFor="sub"></label>
        <input type="submit" name="sub" value="Send" id="sub" />
      </form>
    </section>
  );
}
