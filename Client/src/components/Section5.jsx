import { useCallback, useState, useEffect } from "react";
import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";

const Section5 = ({ className = "" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    location: "",
    hours: [],
  });

  useEffect(() => {
    fetch("http://localhost:4000/contact-info")
      .then((response) => response.json())
      .then((data) => {
        setContactInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching contact information:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      message,
      consent,
    };

    fetch("http://localhost:4000/submit-contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setConsent(false);
        } else {
          alert("Failed to submit the form. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const onLinkEmailUsAtAilemendaniClick = useCallback(() => {
    window.location.href = `mailto:${contactInfo.email}`;
  }, [contactInfo]);

  const onLinkOurLocationAtLagosClick = useCallback(() => {
    window.open("https://www.google.com/maps/place/Lagos+LA+NG");
  }, []);

  return (
    <section className={`py-12 bg-gray-100 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-6/12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in touch</h2>
            <p className="text-xl text-gray-600 mb-6">We'd love to hear from you</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <FrameComponent
                emailAddress="Email address"
                containerPlaceholder="email@website.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FrameComponent
                emailAddress="Phone number"
                containerPlaceholder="555-555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={6}
                  placeholder="Your message..."
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span className="text-sm">
                  I allow this website to store my submission so they can respond to my inquiry.{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="w-full lg:w-5/12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700">Email</h4>
                <p
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={onLinkEmailUsAtAilemendaniClick}
                >
                  {contactInfo.email || "Loading..."}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700">Location</h4>
                <p
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={onLinkOurLocationAtLagosClick}
                >
                  {contactInfo.location || "Loading..."}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Hours</h4>
                <ul className="space-y-2">
                  {contactInfo.hours.length > 0
                    ? contactInfo.hours.map((hour, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{hour.day}</span>
                          <span>
                            {hour.open} - {hour.close}
                          </span>
                        </li>
                      ))
                    : "Loading..."}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Section5.propTypes = {
  className: PropTypes.string,
};

export default Section5;
