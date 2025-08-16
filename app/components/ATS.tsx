import React from 'react'

interface ATSProps {
    score: number;
    suggestions: {
        type: "good" | "improve";
        tip: string;
    }[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    // Determine background gradient based on score
    let bgGradient = '';
    let iconSrc = '';

    if (score > 70) {
        bgGradient = 'from-green-100';
        iconSrc = '/icons/ats-good.svg';
    } else if (score > 49) {
        bgGradient = 'from-yellow-100';
        iconSrc = '/icons/ats-warning.svg';
    } else {
        bgGradient = 'from-red-100';
        iconSrc = '/icons/ats-bad.svg';
    }

    return (
        <div className={`bg-gradient-to-b ${bgGradient} to-white rounded-2xl shadow-md p-6 w-full`}>
            {/* Top section with icon and headline */}
            <div className="flex items-center gap-4 mb-4">
                <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10" />
                <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
            </div>

            {/* Description section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Applicant Tracking System Analysis</h3>
                <p className="text-gray-600 mb-4">
                    This score indicates how well your resume is optimized for Applicant Tracking Systems.
                    A higher score means your resume is more likely to pass through automated screening.
                </p>

                {/* Suggestions list */}
                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <img 
                                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                                alt={suggestion.type === "good" ? "Check" : "Warning"} 
                                className="w-5 h-5 mt-0.5" 
                            />
                            <p className="text-sm">{suggestion.tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Closing line */}
            <p className="text-sm text-gray-700 italic">
                Continue improving your resume to increase your chances of getting past ATS filters.
            </p>
        </div>
    )
}

export default ATS
