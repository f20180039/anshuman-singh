export default function Contact() {
  return (
    <section id="contact" className="ans-py-12 ans-text-center">
      <p className="ans-text-lg ans-font-medium">Get in Touch</p>
      <h1 className="ans-text-3xl ans-font-bold">Contact Me</h1>
      <div className="ans-flex ans-justify-center ans-gap-8 ans-mt-8">
        <div className="ans-flex ans-items-center ans-gap-4">
          <img src="./assets/email.png" alt="Email icon" className="ans-w-8" />
          <p>
            <a
              href="mailto:singh.anshuman.singh8@gmail.com"
              className="ans-text-Blue-500"
            >
              singh.anshuman.singh8@gmail.com
            </a>
          </p>
        </div>
        <div className="ans-flex ans-items-center ans-gap-4">
          <img
            src="./assets/linkedin.png"
            alt="LinkedIn icon"
            className="ans-w-8"
          />
          <p>
            <a
              href="https://linkedin.com/in/anshuman-singh-4546b5275"
              className="ans-text-Blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              anshuman-singh-4546b5275
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// const Contact = () => (
//   <div className="ans-p-8">
//     <h1 className="ans-text-3xl ans-font-bold">Contact Me</h1>
//     <p className="ans-mt-4">Email: example@example.com</p>
//   </div>
// );