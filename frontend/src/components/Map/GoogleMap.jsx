import React from "react";

const GoogleMap = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36989.51076496915!2d77.07598003013803!3d28.578045599833715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b85fc2a2d89%3A0xbef376182c43ed9d!2sIndira%20Gandhi%20International%20Airport!5e0!3m2!1sen!2sin!4v1721292924255!5m2!1sen!2sin"
        width="1350"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Indira Gandhi International Airport"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
