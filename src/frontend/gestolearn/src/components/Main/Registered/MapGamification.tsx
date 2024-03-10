import c1Lessons from "../../../assets/c1-lessons.png";
import c2Lessons from "../../../assets/c2-lessons.png";
import c1Quiz from "../../../assets/c1-quiz.png";
import c2Quiz from "../../../assets/c2-quiz.png";
import c1Assesment from "../../../assets/c1Assessment.png";
import c2Assesment from "../../../assets/c2Assessment.png";
import treasureUnlocked from "../../../assets/treasure-unlocked.png";
import treasureLocked from "../../../assets/treasure-locked.png";
import c2Locked from "../../../assets/c2-locked.png";
import "../../../../App.css";

function MapGamification() {
  return (
    <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-18 font-serif">
      <div className="shadow-lg bg-blue-200 flex flex-col justify-center items-center px-2 py-2 mb-8 rounded-2xl max-md:max-w-full max-md:px-4">
        <div className="flex flex-col items-stretch text-center my-2 max-md:max-w-full">
          <div className="text-black text-2xl self-center">
            Category 1: Greetings
          </div>

          <div className="text-neutral-600 text-xl mt-1 max-md:max-w-full">
            Expressive Greetings: Unlocking Connection through Sign Language
          </div>
        </div>
      </div>

      <img
        src={c2Lessons}
        className="aspect-[1.45] object-contain object-center w-[10%] overflow-hidden self-center max-w-full mt-18 max-md:mt-10"
      />

      <div className="max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[50%] max-md:w-full max-md:ml-0"></div>
          <div className="flex flex-col items-stretch w-[50%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-start max-md:max-w-full max-md:mt-10">
              <img
                src={c2Quiz}
                className="aspect-[1.35] object-contain object-center w-[21%] overflow-hidden max-w-full"
              />

              <img
                src={c2Quiz}
                className="object-center self-end mt-4 mr-60 max-w-full aspect-[1.35] w-[21%] max-md:mr-2.5"
              />

              <img
                src={c2Assesment}
                className="aspect-[1.45] object-contain mr-2 object-center w-[21%] overflow-hidden max-w-full mt-6 max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>

      <img
        src={treasureUnlocked}
        className="aspect-[1.22] object-contain object-center w-[13%] overflow-hidden self-center max-w-full mt-9"
      />

      <div className="shadow-lg bg-blue-200 mb-8 flex flex-col justify-center items-center px-2 py-2 rounded-2xl w-full mt-10">
        <div className="flex flex-col items-stretch text-center mt-2 mb-2 max-md:max-w-full">
          <div className="text-black text-2xl self-center max-md:max-w-full">
            Category 2: Family
          </div>

          <div className="text-neutral-600 text-xl mt-1 max-md:max-w-full">
            Embrace every gesture of love: Learn to sign 'family' and connect
            deeper.
          </div>
        </div>
      </div>

      <div className="flex flex-col grow items-start max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col ml-9 max-w-full w-[350px] max-md:ml-2.5">
          <img
            src={c1Lessons}
            className="aspect-[1.45] ml-32 object-contain object-center w-[22%] overflow-hidden self-center max-w-full mt-2 max-md:mt-10"
          />

          <img src={c1Quiz} className="max-w-full ml-32 aspect-[1.35] w-[19%]" />
        </div>

        <div className="flex flex-col ml-9 max-w-full w-[40%]">
          <img src={c1Quiz} className="max-w-full ml-24 aspect-[1.35] w-[22%] mt-4" />

          <img
            src={c1Assesment}
            className="self-center ml-28 max-w-full aspect-[1.45] w-[23%]"
          />

          <img
            src={treasureUnlocked}
            className="self-end mt-8 max-w-full aspect-[1.22] w-[31%]"
          />
        </div>
      </div>

      <div className="shadow-lg bg-blue-200 flex flex-col justify-center items-center px-2 py-2 rounded-2xl w-full mt-10">
        <div className="flex flex-col items-stretch text-center mt-2 mb-2 max-md:max-w-full">
          <div className="text-black text-2xl self-center max-md:max-w-full">
            Category 3: Feelings and Emotions
          </div>
          <div className="text-neutral-600 text-xl mt-1 max-md:max-w-full">
            Sign the Feeling: Navigating Emotional States through Sign Language
          </div>
        </div>
      </div>

      <img
        src={c2Lessons}
        className="aspect-[1.45] object-contain object-center w-[9%] overflow-hidden self-center max-w-full mt-10 max-md:mt-10"
      />

      <div className="max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[50%] max-md:w-full max-md:ml-0"></div>
          <div className="flex flex-col items-stretch w-[50%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-start max-md:max-w-full max-md:mt-10">
              <img
                src={c2Quiz}
                className="aspect-[1.59] object-contain object-center w-[21%] overflow-hidden max-w-full"
              />

              <img
                src={c2Locked}
                className="object-center self-end mt-2 mr-60 max-w-full aspect-[1.20] w-[19%] max-md:mr-2.5"
              />

              <img
                src={c2Locked}
                className="aspect-[1.21] object-contain object-center w-[21%] overflow-hidden max-w-full mt-4 max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>

      <img
        src={treasureLocked}
        className="aspect-[1.13] object-contain object-center w-[12%] overflow-hidden self-center max-w-full mt-7"
      />
    </div>
  );
}
export default MapGamification;
