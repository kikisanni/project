import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 mb-10">
        <h2 className="text-center mb-8 font-bold font-serif underline underline-offset-8 decoration-blue-400 text-3xl">
          Terms and Conditions of Service
        </h2>

        <div className="self-start mt-5 flex gap-x-2 justify-center items-center mb-4 text-base italic text-black max-md:max-w-full">
          <span className="italic font-light">
            Disclaimer: These guidelines were taken from Duolingo. Click
          </span>
          <a
            href="https://www.duolingo.com/terms"
            className="italic font-light underline"
          >
            here
          </a>
          <span className="italic font-light"> to view.</span>
        </div>

        <ol className="list-decimal pl-5">
          <li className="font-semibold text-xl mb-4">General</li>
          <p className="mb-10">
            GestoLearn website is operated by two Dublin City University final year students. (“GestoLearn,” “us,” or
            “we”). Access and use of the Service is subject to the following
            Terms and Conditions of Service (“Terms and Conditions”). By
            accessing or using any part of the Service, you represent that you
            have read, understood, and agree to be bound by these Terms and
            Conditions including any future modifications. GestoLearn may amend,
            update, or change these Terms and Conditions. If we do this, we will
            post a notice that we have made changes to these Terms and
            Conditions on the Websites for at least 7 days after the changes are
            posted and will indicate at the bottom of the Terms and Conditions
            the date these terms were last revised. Any revisions to these Terms
            and Conditions will become effective the earlier of (i) the end of
            such 7-day period or (ii) the first time you access or use the
            Service after such changes. If you do not agree to abide by these
            Terms and Conditions, you are not authorized to use, access, or
            participate in the Service.
          </p>

          <li className="font-semibold text-xl mb-4">
            {" "}
            Description of Website and Services
          </li>

          <p className="mb-10">
            The Service allows users to access and use a variety of educational
            services, including learning or practicing a language. GestoLearn may,
            in its sole discretion and at any time, update, change, suspend,
            make improvements to or discontinue any aspect of the Service,
            temporarily or permanently.
          </p>

          <li className="font-semibold text-xl mb-4">
            Acceptable Use of the Services
          </li>
          <p className="mb-10">
            You are responsible for your use of the Services, and for any use of
            the Services made using your account. Our goal is to create a
            positive, useful, and safe user experience. To promote this goal, we
            prohibit certain kinds of conduct that may be harmful to other users
            or to us. When you use the Services, you must comply with our
            Community Guidelines.
          </p>
        </ol>
      </div>
    </div>
  );
};

export default Terms;
