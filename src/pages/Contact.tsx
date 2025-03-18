import { C_LINKEDIN_URL, C_MY_MAIL, C_MY_PHONE_NUMBER } from "../common/constants";
import { FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ReactNode } from "react";
// import PhoneIcon from "../assets/phone.png";

interface ContactItemProps {
  icon: ReactNode;
  altText: string;
  link: string;
  displayText: string;
  isExternal?: boolean;
}

const ContactItem = ({
  icon,
  altText,
  link,
  displayText,
  isExternal = false,
}: ContactItemProps) => {
  return (
    <div className="ans-flex ans-items-center ans-gap-4">
      <span className="ans-text-4 ans-text-Blue_gray-700 dark:ans-text-Blue_gray-600">
        {icon}
      </span>
      <p>
        <a
          href={link}
          className="ans-text-Blue-500 dark:ans-text-Blue-400 hover:ans-underline"
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : ""}
          aria-label={altText}
        >
          {displayText}
        </a>
      </p>
    </div>
  );
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="ans-py-12 ans-text-center ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White"
    >
      <p className="ans-text-lg ans-font-medium ans-text-Gray-700 dark:ans-text-Gray-300">
        Get in Touch
      </p>
      <h1 className="ans-text-3xl ans-font-bold ans-text-Blue-600 dark:ans-text-Blue-400">
        Contact Me
      </h1>

      <div className="ans-flex ans-flex-col sm:ans-flex-row ans-justify-center ans-gap-8 ans-mt-8">
        <ContactItem
          icon={<MdEmail />}
          altText="Email icon"
          link={`mailto:${C_MY_MAIL}`}
          displayText={C_MY_MAIL}
        />
        <ContactItem
          icon={<FaPhoneAlt />}
          altText="Phone icon"
          link={`tel:${C_MY_PHONE_NUMBER}`}
          displayText={C_MY_PHONE_NUMBER}
        />
        <ContactItem
          icon={<FaLinkedin />}
          altText="LinkedIn icon"
          link={C_LINKEDIN_URL}
          displayText="anshuman-singh-4546b5275"
          isExternal={true}
        />
      </div>
    </section>
  );
}
