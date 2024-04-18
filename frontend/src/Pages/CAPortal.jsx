
import { Link, useNavigate} from "react-router-dom";
import '../index.css';
import CAPortalVid from "../assets/Videos/CAPortalVid.webm";
import CAPortal_Astro1 from "../assets/Images/CAPortal_Astro1.webp";
import CAPortal_Astro2 from "../assets/Images/CAPortal_Astro2.webp";
import CAPortal_Astro3 from "../assets/Images/CAPortal_Astro3.webp";

const CAPortal = () => {
   // Get access to the history object
    const navigate = useNavigate()
    const handleRegisterClick = () => {
        // Redirect the user to the googleauth page
        navigate('/googleauth', { state: { referrer: '/caportal' } })
    };
    return (
        <div className="bg-black text-white">
            <div className="flex flex-col gap-10 items-center justify-center w-full h-screen absolute z-10">
                <h1 className="text-white z-30 md:text-[150px] font-cuda text-5xl drop-shadow-2xl">CA Portal</h1>
                <button className="btn" type="button" onClick={handleRegisterClick}>
                   
                        <strong className="font-cM">REGISTER NOW</strong>
                        <div id="container-stars">
                            <div id="stars"></div>
                        </div>
                        <div id="glow">
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                   
                </button>
            </div>

            <div className="w-full h-screen">
                <video className="w-full h-full object-cover brightness-90" autoPlay loop muted>
                    <source src={CAPortalVid} type="video/webm"/>
                </video>
            </div>

            <div className="bg-cover bg-center bg-no-repeat h-full bg-EventBG px-20">
                <section className="mx-auto py-20">
                    <div className="flex flex-col gap-16 md:flex-row justify-between items-center">
                        <div className="w-full md:w-4/12">
                            <img src={CAPortal_Astro1} alt="Astronaut 1 img" className="hidden md:block"/>
                        </div>
                        <div className="w-full md:w-8/12">
                            <div className="flex flex-col gap-14 font-cM text-center md:text-left">
                                <h2 className="text-4xl">What is <span className="text-[#5F43B2]">CA Portal?</span></h2>
                                <p className="font-cR">The Goonj Campus Ambassador Program is your chance to be a key player in our college cultural fest! As an ambassador, you will spread the word, boost participation, and create a buzz about Goonj. Gain exclusive perks, network with fellow students, and be at the forefront of the most anticipated event on campus! It is a short and sweet opportunity to showcase your leadership and creativity. Join the excitement of Goonj as a Campus Ambassador!</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto">
                    <div className="flex flex-col gap-16 md:flex-row justify-between items-center">
                        <div className="w-full md:w-8/12">
                            <div className="flex flex-col gap-14 font-cM text-center md:text-left">
                                <h2 className="text-4xl">Why become a <span className="text-[#5F43B2]">Campus Ambassador?</span></h2>
                                <p className="font-cR">Elevate your college experience by becoming a Campus Ambassador for our cultural fest! As an ambassador, you will be the catalyst for the fests success, leading promotional efforts and shaping the events narrative. This role is not just about leadership and creativity; it is a chance to forge lasting connections within the college community. Enjoy exclusive perks, gain recognition, and contribute to the vibrant cultural tapestry of our college. Be part of something extraordinary—join us in creating an unforgettable cultural fest!</p>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12">
                            <img src={CAPortal_Astro2} alt="Astronaut 2 img" className="hidden md:block"/>
                        </div>
                    </div>
                </section>

                <section className="mx-auto">
                    <div className="flex flex-col justify-center items-center gap-14 md:flex-row">
                        <div className="w-full md:w-1/4 hidden md:block">
                            <img src={CAPortal_Astro3} alt="Astronaut 3 img" className=""/>
                        </div>
                        <div className="w-full md:w-3/4">
                            <h2 className="font-cM text-4xl md:text-5xl my-10 text-center">Perks</h2>
                            <div className="font-cR flex flex-col md:flex-row justify-center mx-auto items-center text-xl text-center sm:text-left">
                                <div className="flex flex-col gap-10 pb-10">
                                    <p><span className="text-[#5F43B2]">Free Entry</span> for the Campus Ambassador on 15+ Participation.</p>
                                    <p><span className="text-[#5F43B2]">Free</span> Goonj <span className="text-[#5F43B2]">T-shirt</span></p>
                                </div>
                                <div className="text-center sm:text-right">
                                    <p><span className="text-[#5F43B2]">Free Entry</span> to the Workshops conducted by our partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto py-20 flex flex-col justify-center items-center gap-5 text-3xl font-cM text-center">
                    <p>WHAT ARE YOU WAITIN’ FOR?</p>
                    <p className="text-[#5F43B2]">REGISTER NOW!!</p>
                </section>
            </div>
        </div>
    );
};

export default CAPortal;
