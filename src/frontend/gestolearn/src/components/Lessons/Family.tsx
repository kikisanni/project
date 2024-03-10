import { useEffect, useState } from "react";
import { H5P } from "h5p-standalone";
import { Link } from "react-router-dom";
import threeStars from "../../assets/stars.png";
import clock from "../../assets/lesson-clock.png";
import learn from "../../assets/videos.jpg";
import '../../../App.css';
import Copyright from "../Footer/Copyright";

function Family() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    let isMounted = true;
    setIsUserLoading(true);

    fetch('http://localhost:8000/auth/login/success', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (isMounted && data.user?._id) 
        {
          setCurrentUser(data.user._id);
          
          if (lessonCompleted) 
          {
            lessonCompletion();
          }
        } 
        else 
        {
          console.error('User data is not available in the response.');
        }
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      })
      .finally(() => {
        if (isMounted) {
          setIsUserLoading(false);
        }
      });

    // Cleanup function to set isMounted to false when component unmounts
    return () => { isMounted = false; };
  }, [lessonCompleted]);

  const lessonCompletion = async () => {
    if (isUserLoading) {
      console.log("User's data is still loading. Waiting to update points.");
      setLessonCompleted(true);
      return;
    }

    if (!currentUser) {
      console.error("Current user is not set. Cannot update points.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/lesson/updatePoints', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonId: 'lesson-3' }),
      });
  
      if (!response.ok) {
        if (response.status === 409) {
          const data = await response.json();
          alert(data.message); // This will show "Lesson already completed. No points awarded."
          return; // Stop further execution
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.message === "Points added successfully!!") {
        alert("Congratulations! You have completed this lesson and earned 2 points!");
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };
  useEffect(() => {
    const initializeH5P = async () => {
      const el = document.getElementById("h5p-container");
      if (!el) return;

      try {
        const h5pInstance = new H5P(el, {
          // Define the options for H5P standalone
          h5pJsonPath: "/family",
          frameJs: "/dist/frame.bundle.js",
          frameCss: "/dist/styles/h5p.css",
          fullScreen: true,
        });

        // Wait for H5P instance to be ready
        await h5pInstance;
        console.log("H5P content is loaded and ready.");

        // Attach event listener for xAPI events
        window.H5P.externalDispatcher.on('xAPI', (event:any) => {
          if (event.data.statement.verb.id.endsWith('completed')) {
            console.log("H5P lesson completed");
            //Handle lesson completion logic
          }
        });
      } catch (error) {
        console.error("Failed to load H5P content: ", error);
      }
    };

    initializeH5P();
  }, []);
  

  return (
    <div>
    <div className="flex justify-center items-center px-16 py-12 max-md:px-5 font-serif">
      <div className="flex flex-col  max-w-full w-[1257px] max-md:mt-10">
        {/* <div
          onClick={redirectToMain}
          className="cursor-pointer self-start ml-3.5 text-base text-center text-zinc-500 max-md:ml-2.5"
        >
          &lt;-Back to Homepage
        </div> */}
        <div className="mt-2 max-md:max-w-full font-bold text-center text-3xl underline underline-offset-8 decoration-blue-400">
          Lesson 2: Family
        </div>
        <div className="mt-12 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[66%] max-md:ml-0 max-md:w-full">
              <div
                id="h5p-container"
                className="mx-auto max-w-full w-[843px] max-md:mt-6"
              />
            </div>
            <div className="flex flex-col ml-4 w-[32%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pb-4 w-full text-base text-black shadow-lg bg-neutral-50 max-md:mt-6">
                <img src={learn} className="w-full aspect-[1.22]" />
                <div className="flex flex-col px-4 mt-3">
                  <div className="text-xl font-bold">Learn</div>
                  <div className="mt-2">/ləːn/</div>
                  <div className="mt-3 text-justify">
                    Gain or acquire knowledge of or skill in (something) by
                    study, experience, or being taught.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-start mt-5 flex gap-x-2 ml-40 text-base italic text-black max-md:max-w-full">
          <span className="italic font-light">
            Disclaimer: We have no rights to this video. Click
          </span>
          <a
            href="https://www.youtube.com/watch?v=VOnHnaNiVSM"
            className="italic font-light underline"
          >
            here
          </a>
          <span className="italic font-light"> to view the creator.</span>
        </div>
        <div className="mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full font-serif">
              <div className="flex flex-col grow px-6 py-10 w-full text-base text-center text-black shadow-lg bg-neutral-50 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex gap-3.5 self-start mt-5 whitespace-nowrap">
                  <img src={clock} className="mix-blend-darken w-[30px]" />
                  <div className="grow my-auto">Duration: 5:36 minutes</div>
                </div>
                <div className="mt-3.5 text-xl text-justify max-md:max-w-full">
                  Embark on a captivating journey with the interactive video
                  above, meticulously tailored to teach the fundamental signs
                  for 'family' in American Sign Language. This immersive
                  experience combines vivid, precise demonstrations with
                  engaging quizzes, fostering a profound comprehension of each
                  vital sign.
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full font-serif">
              <div className="flex flex-col grow px-6 py-3 w-full text-xl font-light text-justify text-black shadow-lg bg-neutral-50 max-md:px-5 max-md:mt-6">
                <img
                  src={threeStars}
                  className="self-center max-w-full w-[250px]"
                />
                <div className="mt-4 italic max-md:mt-10 font-serif">
                  Complete the lesson to unlock the quizzes and earn Gesto
                  Points, celebrating your journey in embracing the beautiful
                  world of family connections through ASL.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Copyright />
    </div>
  );
}
export default Family;

// https://www.youtube.com/watch?v=VOnHnaNiVSM
// Embark on a captivating journey with the interactive video above, meticulously tailored to teach the fundamental signs for 'family' in American Sign Language. This immersive experience combines vivid, precise demonstrations with engaging quizzes, fostering a profound comprehension of each vital sign.
//
