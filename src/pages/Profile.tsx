const Profile = () => {
  return (
    <section
      id="profile"
      className="ans-flex ans-flex-col ans-items-center ans-text-center ans-pt-20 ans-pb-10"
    >
      <img
        src="./assets/profile-pic.png"
        alt="Anshuman Singh"
        className="ans-w-40 ans-h-40 ans-rounded-full"
      />
      <h1 className="ans-text-4xl ans-font-bold ans-text-Blue-600">
        Anshuman Singh
      </h1>
      <p className="ans-text-Gray-500 ans-text-lg">Frontend Developer</p>
      <div className="ans-mt-4 ans-flex ans-gap-4">
        <button className="ans-bg-Success-500 ans-px-6 ans-py-2 ans-rounded ans-text-White">
          Download CV
        </button>
        <button className="ans-bg-Blue-500 ans-px-6 ans-py-2 ans-rounded ans-text-White">
          Contact Info
        </button>
      </div>
    </section>
  );
};

export default Profile;
