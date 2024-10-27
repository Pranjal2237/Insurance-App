import React from "react";

const About = () => {
  return (
    <div className="bg-[--btn-bg] padding-inline flex gap-8 py-20 flex-col lg:flex-row">
      <div className="bg-white p-6 sm:p-24">
        <h1 className="text-3xl font-bold mb-10">About us</h1>
        <p className="text-base mb-6 leading-8">
          Welcome to 99insuranceagency.com, your trusted resource for finding
          the best insurance agencies across the United States. We understand
          that navigating the complex world of insurance can be overwhelming,
          whether you’re seeking coverage for your home, vehicle, health, or
          business. That’s why we’re here—to make the process simpler, faster,
          and stress-free.
        </p>
        <p className="text-base mb-6 leading-8">
          At 99insuranceagency.com, our mission is to connect you with
          reputable, top-rated insurance agencies that are committed to meeting
          your unique needs. We’ve curated an extensive directory of agencies
          that span every corner of the country, from bustling cities like
          Boston and Columbia to smaller towns like Noblesville. Each agency
          listed on our platform is thoroughly vetted to ensure they meet our
          high standards of professionalism, reliability, and customer
          satisfaction.
        </p>
        <p className="text-base mb-6 leading-8">
          What sets us apart is our dedication to quality and user experience.
          We’ve designed our website with you in mind, offering easy-to-use
          search tools that allow you to filter agencies by location, insurance
          type, and customer ratings. Whether you’re a first-time insurance
          buyer or looking to switch providers, our platform provides all the
          information you need to make an informed decision.
        </p>
        <p className="text-base mb-6 leading-8">
          We’re more than just a directory; we’re a community. Our platform also
          offers valuable insights, tips, and resources to help you understand
          your options and make the best choices for your insurance needs. Our
          commitment to transparency and customer support means that you can
          trust us to guide you every step of the way.
        </p>
      </div>
      <div className="bg-white p-10">
        <h3 className="min-w-max">Recent Posts</h3>
      </div>
    </div>
  );
};

export default About;
