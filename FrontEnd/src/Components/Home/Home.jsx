import { React, useState } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { LogIn, LogOut, UserPlus, Menu } from "lucide-react";
import StatsSection from "./StatsSection";
import JobListingApp from "../JobListingapp/JobListingApp";
import JobGrid from "../JobGrid/JobGrid";
import { useNavigate } from "react-router-dom";

const AnimatedHeading = () => {
  const [position, setPosition] = useState(0);
  const [isForward, setIsForward] = useState(true);

  const headingText = "Your Next Opportunity\nAwaits";

  const subText =
    "Discover the right role for you no noise. Just real jobs. Real growth";
  const words = subText.split(" ");

  // temporary use effect 

//   useEffect (() =>{
//     console.log("jobService:", jobService); // Add this line to debug

//     const getJobs = async () => {
//     try {
//       console.log("trying to fetch jobs");
//       const { data } = await jobService.getAllJobs(); // Destructure to get data directly
      
//       if (data.length > 0) {
//         console.log("data found");
//         console.log(data.length);
//         for (const job of data) {
//           console.log(job.id);
//         }
//       } else {
//         console.log("data not found");
//       }
//     } catch (error) {
//       console.error("error in getting the jobs:", error);
//     }
// };

//     const getAjob = async () =>{
//       const jobid = 10
//       const data = await jobService.getbyId(jobid)
//       if(data){
//         console.log("data found")
//         console.log(data.title)

//       }else{
//         console.log("data not found")
//       }
//     }

//     const filterJob = async () => {
//       const filters = {
//         // job_type: "Internship",
//         // company : "MetLife",
//         tag: ['Senior Actuary', 'Life', 'lahore'] 
//       };
//       const data = await jobService.filterJob(filters)
//       if(data){
//         console.log("filtered complete")
//         console.log(data)
//       }else{
//         console.log("did not match any filter")
//       }

//     }

//     const postJob = async () =>{
//       const newJob = {
//           // title: "CEO",
//           company: "BitBash",
//           country: "Pakistan",
//           location: "Lahore",
//           posting_date: "1d ago",
//           job_type: "Internship",
//           tags: ["Pricing", "Hospitality", "Fule funds", "Senior Actuary", "Life"]
//         };
            

//       const result = await jobService.postJob(newJob);

//       if (result) {
//         console.log("Job posted successfully:", result);
//       } else {
//         console.log("Failed to post job");
//       }


//     }

//    const updatePost = async () =>{
//       const newJob = {
//           id: 1,
//           company: "BitBash",
//           country: "Pakistan",
//           location: "Lahore",
//           posting_date: "1d ago",
//           job_type: "Internship",
//           tags: ["Pricing", "Hospitality", "Fule funds", "Senior Actuary", "Life"]
//         };
//         const result = await jobService.editJob(newJob)
//         if(result){
//           console.log("updated")
//         }else{
//           console.log("error in updation")
//         }
//     }
//     const deletePost = async () =>{
//       const id = 2;
//       const result = await jobService.deletePost(id)
      
//       if(result){
//         console.log(result.message)
//       }else{
//         console.log(result.error)
//       }

//     }
//     //getAjob()
//     getJobs()
//     //filterJob()
//     //postJob()
//     //updatePost()
//     //deletePost()

//   }, [])

  //temporary end 
  useEffect(() => {
    let timeoutId;
    const totalLength = headingText.length + words.join(" ").length;

    if (isForward && position < totalLength) {
      // Forward animation - normal speed (100ms)
      timeoutId = setTimeout(() => {
        setPosition(position + 1);
      }, 50);
    } else if (isForward && position === totalLength) {
      // Pause at the end before reversing (1000ms)
      timeoutId = setTimeout(() => setIsForward(false), 100);
    } else if (!isForward && position > 0) {
      // Reverse animation - faster speed (30ms)
      timeoutId = setTimeout(() => {
        setPosition(position - 1);
      }, 30);
    } else if (!isForward && position === 0) {
      // Short pause before starting forward again (100ms)
      timeoutId = setTimeout(() => setIsForward(true), 10);
    }

    return () => clearTimeout(timeoutId);
  }, [position, isForward, headingText.length, words]);

  const renderAnimatedText = (text, isHeading = true) => {
    const lines = text.split("\n");
    const currentPos = isHeading
      ? position
      : Math.max(0, position - headingText.length);
    let charCount = 0;

    return lines.map((line, lineIndex) => {
      const chars = line.split("");
      return (
        <div
          key={lineIndex}
          className={`relative ${
            isHeading
              ? "text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              : "text-sm sm:text-base md:text-lg text-gray-100 mt-6 tracking-wide"
          }`}
        >
          {chars.map((char, charIndex) => {
            const isVisible =
              charCount <
              (isHeading
                ? position
                : Math.max(0, position - headingText.length));
            charCount++;
            return (
              <span key={charIndex} className="relative inline-block">
                {isVisible && (
                  <>
                    {charCount ===
                      (isHeading
                        ? position
                        : position - headingText.length) && (
                      <span
                        className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-3 h-3 lg:w-8 lg:h-8 rounded-full"
                        style={{
                          background: "#4BCA7B",
                          animation: "infinite",
                        }}
                      />
                    )}
                    {char}
                  </>
                )}
              </span>
            );
          })}
        </div>
      );
    });
  };

  const renderAnimatedSubText = () => {
    let charCount = headingText.length;
    return (
      <div className="text-sm sm:text-base md:text-lg text-slate-300 mt-6 tracking-wide flex flex-wrap justify-center gap-x-2">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="relative inline-block">
            {word.split("").map((char, charIndex) => {
              const isVisible = charCount < position;
              charCount++;
              return (
                <span key={charIndex} className="relative inline-block">
                  {isVisible && (
                    <>
                      {charCount === position && (
                        <span
                          className="absolute -right-5 lg:-right-8 top-1/2 -translate-y-1/2 w-3 h-3 lg:w-6 lg:h-6 rounded-full"
                          style={{
                            background: "#4BCA7B",
                            animation: "infinite",
                          }}
                        />
                      )}
                      {char}
                    </>
                  )}
                </span>
              );
            })}{" "}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-center px-4 z-20 relative mt-20">
      <div className="mb-2">{renderAnimatedText(headingText)}</div>
      {renderAnimatedSubText()}
    </div>
  );
};

const Home = () => {
  const lightRef = useRef(null);
  const particlesRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);

  // Hook to programmatically navigate
  const navigate = useNavigate();

  return (
    <>
      <div id="hero-section">
        <div
          className="relative min-h-screen rounded-bl-3xl rounded-br-3xl lg:mb-6 mb-6  overflow-hidden font-['Space_Grotesk',_sans-serif] text-center"
          style={{
            backgroundImage: "url('/images/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div
            className="absolute inset-0  z-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))",
            }}
          >
            <div className="relative rounded-bl-lg rounded-br-lg flex flex-col items-center w-full max-w-4xl mx-auto pt-16 md:pt-24 lg:pt-32 z-10">
              <AnimatedHeading />
              <div>
                <StatsSection />
              </div>
            </div>

            {/* Font import */}
            <style jsx global>{`
              @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");
            `}</style>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-6 left-6 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white animate-bounce opacity-70"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </footer>

      <section id="jobs-section">
        <JobListingApp />
      </section>

      <section id="find-job-post-section">
        <JobGrid />
      </section>
    </>
  );
};

export default Home;
