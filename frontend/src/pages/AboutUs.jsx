import React from "react";
import GoogleMap from "../components/Map/GoogleMap";

const AboutUs = () => {
  return (
    <div className="h-auto bg-zinc-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        <u>About Us</u>
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our History</h2>
        <p className="text-lg">
          Founded in 2004, our bookstore has been a cornerstone of the community
          for over two decades. We began as a small, independent shop with a
          mission to bring a wide variety of books to readers of all ages and
          interests. Over the years, we have expanded our collection and our
          reach, but our commitment to fostering a love of reading remains
          unchanged.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg">
          Our mission is to provide a welcoming space where book lovers can
          explore, discover, and enjoy a diverse range of literature. We believe
          in the power of books to educate, inspire, and connect people, and we
          strive to support our local community through various events and
          programs.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <p className="text-lg">
          Our team is made up of passionate book enthusiasts who are dedicated
          to helping you find your next great read. Whether you're looking for a
          classic novel, a new release, or a hidden gem, we are here to offer
          recommendations and share our love of books with you.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-lg">
          Have any questions or need assistance? Feel free to reach out to us!
          You can visit us at our store, or email us at bookstore@gmail.com. We
          look forward to hearing from you!
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Find Us Here</h3>
        </div>
       <GoogleMap />
      </div>
    </div>
  );
};

export default AboutUs;
