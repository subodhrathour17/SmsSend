import React, { useState } from "react";

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  //This All details you get When You create Account twilio!
  const sendMessage = async () => {
    const accountSid = ""; //Your accountSid
    const authToken = ""; // Your authToken
    const twilioNumber = ""; //Your twilioNumber

    const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append("To", encodeURIComponent(`91${phoneNumber}`));
    formData.append("From", twilioNumber);
    formData.append("Body", encodeURIComponent(message));
    console.log("formData", formData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Message sent successfully!");
      } else {
        console.error(
          "Failed to send message:",
          response.statusText,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Phone Number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder='Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
