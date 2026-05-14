import { useState, useEffect } from "react";
import { LogIn, SignUp } from "../../pages";
// data
import { AUTH_TEXT } from "../../data/data";

const AuthLayout = () => {
    const [isSignInLayout, setIsSignInLayout] = useState(true);

    // Trigger the initial animation after mount (mimicking the original setTimeout)
    useEffect(() => {
        setIsSignInLayout(false);
    }, []);

    const toggle = () => setIsSignInLayout(!isSignInLayout);

    return (
        <div
            className={`relative min-h-screen overflow-hidden bg-white font-['Poppins'] ${isSignInLayout ? "sign-in" : "sign-up"}`}
        >
            {/* Background Decorator - The sliding curve */}
            <div
                className={`absolute top-0 right-1/2 h-screen w-[300vw] z-[6] transition-transform duration-1000 ease-in-out shadow-xl
            bg-gradient-to-br from-[#4EA685] to-[#57B894]
            rounded-tr-[max(50vw,50vh)] rounded-bl-[max(50vw,50vh)]
            ${isSignInLayout ? "translate-x-0" : "translate-x-full"}`}
            />

            {/* Forms Section */}
            <div className="relative flex flex-wrap h-screen">
                {/* Sign Up Side */}
                <div
                    className={`w-1/2 flex items-center justify-center transition-all duration-500 ${!isSignInLayout ? "z-10" : "z-1"}`}
                >
                    <SignUp toggle={toggle} isVisible={!isSignInLayout} />
                </div>

                {/* Sign In Side */}
                <div
                    className={`w-1/2 flex items-center justify-center transition-all duration-500 ${isSignInLayout ? "z-10" : "z-1"}`}
                >
                    <LogIn toggle={toggle} isVisible={isSignInLayout} />
                </div>
            </div>

            {/* Content Section (Texts) */}
            <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-[7] flex">
                {/* Sign In Content */}
                <div className="w-1/2 flex flex-col items-start justify-center text-white pt-32 ps-36">
                    <div
                        className={`transition-transform duration-1000 ease-in-out ${isSignInLayout ? "translate-x-0" : "-translate-x-[250%]"}`}
                    >
                        <h2 className="text-5xl font-extrabold"> أهلا بك مجددا</h2>
                    </div>
                </div>
                {/* Sign Up Content */}
                <div className="w-1/2 flex flex-col items-center justify-center text-white pb-32">
                    <div
                        className={`transition-transform duration-1000 ease-in-out ${!isSignInLayout ? "translate-x-0" : "translate-x-[250%]"}`}
                    >
                        <h2 className="text-5xl font-extrabold mb-8">
                            {AUTH_TEXT.join_us}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
