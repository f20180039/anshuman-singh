import { C_LINKEDIN_URL, C_MY_MAIL, C_MY_PHONE_NUMBER } from "../common/constants";
import { FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ReactNode } from "react";
import { useInView } from "../common/utils";

interface ContactItemProps {
  icon: ReactNode;
  altText: string;
  link: string;
  displayText: string;
  isExternal?: boolean;
  iconBg: string;
  delay: string;
}

const ContactItem = ({
  icon,
  altText,
  link,
  displayText,
  isExternal = false,
  iconBg,
  delay,
}: ContactItemProps) => {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`ans-flex ans-flex-col ans-items-center ans-gap-4 ans-bg-th-surface ans-rounded-lg ans-p-6 ans-shadow-sm hover:ans-shadow-md hover:ans-scale-105 ans-transition-all ans-duration-300 ans-opacity-0 ${delay} ${
        isInView ? "ans-animate-fade-in-up" : ""
      }`}
    >
      <div
        className={`ans-w-14 ans-h-14 ans-rounded-full ${iconBg} ans-flex ans-items-center ans-justify-center ans-text-5`}
      >
        {icon}
      </div>
      <a
        href={link}
        className="ans-text-th-accent hover:ans-underline ans-text-center ans-break-all"
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        aria-label={altText}
      >
        {displayText}
      </a>
    </div>
  );
};

export default function Contact() {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section
      id="contact"
      className="ans-py-12 ans-text-center ans-bg-th-bg ans-text-th-fg"
    >
      <div
        ref={titleRef}
        className={`ans-opacity-0 ${titleVisible ? "ans-animate-fade-in-up" : ""}`}
      >
        <p className="ans-text-2 ans-font-inter-1 ans-text-th-muted-fg">
          Get in Touch
        </p>
        <h1 className="ans-text-3 ans-font-inter-3 ans-text-th-accent ans-mt-2 retro-glow">
          Let&apos;s Connect
        </h1>
      </div>

      <div className="ans-flex ans-flex-col sm:ans-flex-row ans-justify-center ans-gap-4 sm:ans-gap-8 ans-mt-10 ans-px-6">
        <ContactItem
          icon={<MdEmail className="ans-text-th-error" />}
          altText="Email"
          link={`mailto:${C_MY_MAIL}`}
          displayText={C_MY_MAIL}
          iconBg="ans-bg-th-error/10"
          delay="stagger-1"
        />
        <ContactItem
          icon={<FaPhoneAlt className="ans-text-th-success" />}
          altText="Phone"
          link={`tel:${C_MY_PHONE_NUMBER}`}
          displayText={C_MY_PHONE_NUMBER}
          iconBg="ans-bg-th-success/10"
          delay="stagger-2"
        />
        <ContactItem
          icon={<FaLinkedin className="ans-text-th-accent" />}
          altText="LinkedIn"
          link={C_LINKEDIN_URL}
          displayText="anshuman-singh-4546b5275"
          isExternal={true}
          iconBg="ans-bg-th-accent/10"
          delay="stagger-3"
        />
      </div>
    </section>
  );
}
