import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { useRef } from "react";
import { FiX } from "react-icons/fi";
import { BsPatchCheckFill } from "react-icons/bs";
import { postcontactData } from "./API/apidataCall";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { HiReceiptRefund } from "react-icons/hi";
const Contact = ({ ref5 }) => {
  const [value, setvalue] = useState();
  const [contactdetail, setcontactdetails] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const form = useRef();

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_excbucx",
        "template_5eewebb",
        form.current,
        "XVgRcYxolTWVE130X"
      )
      .then(
        (result) => {
          // console.log(result.text);
        },
        (error) => {
          // console.log(error.text);
        }
      );
    e.target.reset();
    setvalue("pop_up");
  };

  const setchange = (e) => {
    const { name, value } = e.target;
    setcontactdetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelsubmit = (e) => {
    // e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", contactdetail.name);
    formdata.append("email", contactdetail.email);
    formdata.append("comment", contactdetail.comment);
    postcontactData(formdata, (err, res) => {
      if (err) {
        toast.error("something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      } else {
        toast.success("Sucessfully Saved", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setcontactdetails({
          name: "",
          email: "",
          comment: "",
        });
        return;
      }
    });
  };
  setTimeout(() => {
    setvalue();
  }, 10000);
  return (
    <>
      <section id="contact" ref={ref5}>
        <div
          className="verify_submit"
          style={
            value === "pop_up"
              ? {
                  opacity: "1",
                  visibility: "visible",
                  transition: "0.4s all ease",
                }
              : {}
          }
        >
          <BsPatchCheckFill className="submit_verify_icons" />{" "}
          <p>successfully submitted</p>
          <FiX
            onClick={() => {
              setvalue("pop_back");
            }}
            style={
              value === "pop_up"
                ? {
                    opacity: "1",
                    visibility: "visible",
                    transition: "0.4s all ease",
                  }
                : {}
            }
            className="cut"
          />
        </div>
        <div className="head_text">
          <h5>Get in Touch</h5>
          <h2>Contact Me</h2>
        </div>
        <div className="contact_option">
          <div className="direct_contact">
            <article className="contact__option">
              <MdOutlineEmail className="contact_icons" />
              <h4>Email</h4>
              <h5>pri****@gamil.com</h5>
              <a
                href="mailto:princerajgrke1901@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                send a message
              </a>
            </article>
            <article className="contact__option">
              <RiMessengerLine className="contact_icons" />
              <h4>Messenger</h4>
              <h5>Prince raj</h5>
              <a
                href="https:///m.me/kingjeet.kaur"
                target="_blank"
                rel="noreferrer"
              >
                send a message
              </a>
            </article>
            <article className="contact__option">
              <BsWhatsapp className="contact_icons" />
              <h4>Whatsapp</h4>
              <h5>+91764*****47</h5>
              <a
                href="https://api.whatsapp.com/send?phone=+917645944247"
                target="_blank"
                rel="noreferrer"
              >
                send a message
              </a>
            </article>
          </div>
          <form
            className="contact_form"
            action="https://formsubmit.co/7c26321a0a37ff370361af89d55a3191"
            method="POST"
            onSubmit={handelsubmit}
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              value={contactdetail.name}
              onChange={setchange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={contactdetail.email}
              onChange={setchange}
              required
            />
            <textarea
              name="comment"
              placeholder="Your Message"
              rows="7"
              required
              value={contactdetail.comment}
              onChange={setchange}
            ></textarea>
            <button type="submit" className="btn btn_form">
              Send message
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Contact;
