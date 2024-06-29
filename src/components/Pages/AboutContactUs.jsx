import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const AboutUsContactUs = () => {
  return (
    <div className="bg-cyan-100 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          <Link to="/" className="text-black hover:text-cyan-500">
            Shopy
          </Link>
        </h1>
        <nav className="flex justify-center mb-8">
          <ul className="font-bold p-4 flex flex-wrap justify-between items-center gap-4 text-xl">
            <li>
              <Link smooth to="#about-us" className="hover:text-cyan-500">
                Story Of Shopy
              </Link>
            </li>
            <li>
              <Link smooth to="#about-us" className="hover:text-cyan-500">
                What We Do
              </Link>
            </li>
            <li>
              <Link smooth to="#about-us" className="hover:text-cyan-500">
                Our Plans
              </Link>
            </li>
            <li>
              <Link smooth to="#about-us" className="hover:text-cyan-500">
                What We Implement
              </Link>
            </li>
            <li>
              <Link smooth to="#about-us" className="hover:text-cyan-500">
                How We Impact
              </Link>
            </li>
            <li>
              <Link smooth to="#contact-us" className="hover:text-cyan-500">
                Follow
              </Link>
            </li>
            <li>
              <Link smooth to="#contact-us" className="hover:text-cyan-500">
                Subscribe
              </Link>
            </li>
          </ul>
        </nav>

        <section id="about-us" className="mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">About Us</h2>
          <p className="text-lg container mx-auto">
            Welcome to Shopy, where our passion for quality and customer
            satisfaction drives everything we do. At Shopy, we believe in
            offering more than just products; we strive to create a shopping
            experience that reflects our commitment to excellence. Our journey
            began with a simple yet powerful vision: to provide a diverse range
            of products that cater to every need and desire, sourced from
            reputable suppliers worldwide. Whether you're searching for the
            latest fashion trends, innovative tech gadgets, or everyday
            essentials, Shopy is your one-stop destination.
            <br />
            <br />
            We prioritize transparency and integrity in all our dealings,
            ensuring that every product meets stringent quality standards before
            it reaches your doorstep. Our team meticulously curates each item,
            ensuring that only the best makes it into our collection. Beyond
            offering a wide array of products, we aim to foster a community
            where shoppers can explore, discover, and connect.
            <br />
            <br />
            Customer satisfaction is at the heart of our business ethos. We
            continuously strive to enhance your shopping experience through
            intuitive navigation, secure transactions, and responsive customer
            support. Your feedback matters to us, driving our constant efforts
            to improve and innovate.
            <br />
            <br />
            Shopy is not just about transactions; it's about building lasting
            relationships with our customers based on trust, reliability, and
            mutual respect. As we continue to grow, our commitment remains
            unwavering: to provide you with unparalleled convenience, quality,
            and value every time you shop with us. Thank you for choosing Shopy
            as your trusted partner in online shopping.
          </p>
        </section>

        <section id="contact-us">
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="text-lg text-center">
            If you have any questions or concerns, please feel free to reach out
            to us. You can contact us via email at{" "}
            <a
              href="mailto:support@shopy.com"
              className="text-blue-600 hover:underline"
            >
              support@shopy.com
            </a>{" "}
            or call us at <span className="font-bold">(123) 456-7890</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUsContactUs;
