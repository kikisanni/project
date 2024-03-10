import leftQuotation from "../../../assets/left-quotation.png";
import rightQuotation from "../../../assets/right-quotation.png";
import barbie from "../../../assets/black_barbie.jpg";
import stylish_cat from "../../../assets/stylish-cat.jpg";
import sunset from "../../../assets/sunset.jpg";

type Testimonial = {
  text: string;
  name: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    text: `The videos are very 
  interactive and the 
  quizzes are helpful for 
  remembering  the signs 
  learnt. Very beginner-
  friendly!
  `,
    name: "Kiki Sanni",
    image: barbie,
  },

  {
    text: `The real-time 
  assessment of emotion 
  and signs  is amazing. I 
  am now better able to 
  display signs while 
  having the matching 
  facial expressions.
  `,
    name: "Effa Al Bulushi",
    image: stylish_cat,
  },

  {
    text: `The application itself is 
easy to navigate, the UI 
is aesthetically 
pleasing. The activities 
are very engaging, 
there is  no way you'd 
get bored while 
learning.
`,
    name: "Susan Kelly",
    image: sunset,
  },
];

const TestimonialCard: React.FC<Testimonial> = ({ text, name, image }) => {
  return (
    <div className="bg-blue-200 p-16 rounded-2xl shadow-lg text-center relative mb-12 font-serif">
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-blue-200 bg-white"
        />
      </div>

      <div className="relative pt-8 pb-2">
        <div className="absolute top-13 -left-4 -translate-y-1/6 translate-x-0">
          <img src={leftQuotation} alt="Start quote" className="w-3 h-3" />
        </div>
        <p className="z-10" style={{ whiteSpace: "pre-line" }}>
          {text}
        </p>
        <div className="absolute bottom-5 -right-1 translate-y-1/2 -translate-x-0">
          <img src={rightQuotation} alt="End quote" className="w-3 h-3" />
        </div>
      </div>
      <h1 className="font-bold mt-8">{name}</h1>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <div className="container mx-auto px-4 font-serif">
      <h2 className="text-center mb-5 font-bold font-serif underline underline-offset-8 decoration-blue-400 text-3xl">
        Testimonials
      </h2>
      <h2 className="mb-24 text-center">Discover the Unspoken Words of Praise from Our Community!</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
