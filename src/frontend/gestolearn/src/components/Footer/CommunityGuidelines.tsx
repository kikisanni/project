import React from "react";

const CommunityGuidelines: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 mb-10">
        <h2 className="text-center mb-8 font-bold font-serif underline underline-offset-8 decoration-blue-400 text-3xl">
          Community Guidelines
        </h2>

        <div className="self-start mt-5 flex gap-x-2 justify-center items-center mb-4 text-base italic text-black max-md:max-w-full">
          <span className="italic font-light">
            Disclaimer: These guidelines were taken from Duolingo. Click
          </span>
          <a
            href="https://www.duolingo.com/guidelines"
            className="italic font-light underline"
          >
            here
          </a>
          <span className="italic font-light"> to view.</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2 mt-10">
          GestoLearn is a global community of language learners
        </h2>
        <p className="mb-4">
          We believe that everyone should have access to free language
          education. Our guidelines are meant to build a mutual understanding of
          what being a part of this community is all about. We will take action
          if any of these guidelines are not upheld, so please read carefully.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Always be Respectful</h2>
        <p className="mb-4">
          We come together from across the world at varying language levels with
          the same goal in mind - to learn. Curiosity, questioning, and cultural
          understanding are something we celebrate. Be respectful of others and
          where they’re coming from.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Help and support across all skill levels
        </h2>
        <p className="mb-4">
          We are all in this together. Learning a language is hard and takes a
          lot of courage and dedication. If someone uses incorrect grammar or
          has a question you think has an obvious answer, kindly and calmly help
          them out. Heckling and being straight up mean doesn’t help anyone
          learn. Can’t say it nicely? Don’t weigh in.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Embrace and share regional language differences
        </h2>
        <p className="mb-4">
          A language can have many words, accents and ways to say the same
          thing. We think that’s one of the wonders of languages. Approach these
          conversations with an open mind and attitude.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Think before you share</h2>
        <p className="mb-4">
          We care about your safety. Speaking another language is inherently
          social, but please beware of swapping or posting any private
          information that could be misused. That includes your phone number,
          age, address, what time you’ll be at home, school name, email, or
          other personal information that could put your privacy at risk. Simply
          put: don’t over-share. Sharing and encouraging others to share
          personal data might get your post, and possibly your account, removed.
        </p>

        <div className="underline underline-offset-8 decoration-purple-400"></div>

        <h2 className="text-2xl font-semibold mb-2">
          Attack a person or group of people with words and actions
        </h2>
        <p className="mb-4">
          GestoLearn is a safe place for learners of all backgrounds. Harassment
          and hurtful content will not be tolerated. Using symbols, names and
          text that promote hate—as well as harassing, stalking, impersonating,
          and making sexual remarks towards someone—are considered abuse. The
          same goes for nudity and disturbing profile pictures and usernames. As
          stated in the terms, GestoLearn reserves the right to replace images or
          remove these accounts at its sole discretion. Rule of thumb: if you
          are making someone feel attacked or hurt, then you shouldn’t be doing
          it. We take these reports seriously and may delete your account
          without previous notice if such activity is verified by our team.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Script or cheat maliciously
        </h2>
        <p className="mb-4">
          GestoLearn believes in honest learning. If you are scripting for the
          purposes of cheating or sharing information and instructions about
          using GestoLearn in a way that may impact the system, community,
          learning, data or experience in a negative or significant manner, your
          account and posts may be removed.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Write inflammatory comments
        </h2>
        <p className="mb-4">
          Hateful, obscene and off-topic comments don’t contribute to learning.
          Cursing doesn’t either (let people discover those words in the wild).
          Leave them out of the language discussions.
        </p>

        <h2 className="text-2xl font-semibold mb-2">To summarise</h2>
        <p className="mb-4">
          We do not tolerate content that is:
          <ul className="list-disc pl-5">
            <li>Illegal</li>
            <li>Pornographic</li>
            <li>Excessively profane and violent</li>
            <li>Spam</li>
            <li>Threatening, harassing, or bullying</li>
            <li>Associated with racism or intolerance</li>
            <li>Impersonating someone in a misleading or deceptive manner</li>
            <li>Personal confidential information</li>
          </ul>
        </p>

        <p>
          Please don't waste your time looking for loopholes; we will remove any
          content that violates the spirit of these guidelines and you will risk
          losing partial or full access to Gestolearn without warning. By
          following these guidelines, we will all contribute to an interesting
          and helpful learning community.
        </p>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
