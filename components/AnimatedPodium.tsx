import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { PiHandsClappingDuotone } from "react-icons/pi";

interface Participant {
    name: string;
    score: number;
}

interface AnimatedPodiumProps {
    data: Participant[];
    podiumLimit: number;
}

const AnimatedPodium: React.FC<AnimatedPodiumProps> = ({
    data,
    podiumLimit,
}) => {
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    const baseHeight = 500;
    const heightDecrement = 20;

    const displayData = sortedData.slice(
        0,
        Math.min(sortedData.length, podiumLimit)
    );

    const getIconForPosition = (position: number) => {
        if (position === 0)
            return <FaTrophy className="text-yellow-500" size={30} />;
        if (position === 1)
            return <FaMedal className="text-gray-400" size={26} />;
        if (position === 2)
            return <FaMedal className="text-orange-400" size={26} />;
        return <PiHandsClappingDuotone className="text-pink-500" size={24} />;
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="flex justify-center items-end mb-8 w-full">
                {displayData.map((participant, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center mx-2"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-gray-200 flex items-center justify-center text-gray-700 font-bold mb-4">
                            {getIconForPosition(index)}
                        </div>
                        <motion.div
                            className="w-32 rounded-t-lg flex flex-col items-center justify-start p-2"
                            style={{
                                backgroundColor:
                                    index === 0
                                        ? "#FFD700"
                                        : index === 1
                                        ? "#C0C0C0"
                                        : index === 2
                                        ? "#CD7F32"
                                        : "#FFC0CB",
                                height: `${
                                    baseHeight - index * heightDecrement
                                }px`,
                            }}
                            initial={{ height: 0 }}
                            animate={{
                                height: `${
                                    baseHeight - index * heightDecrement
                                }px`,
                            }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <span className="text-white font-bold mb-1">
                                {participant.score > 0
                                    ? `${participant.score}%`
                                    : ""}
                            </span>
                            <div className="w-full border border-white mb-2" />
                            <span className="text-white mb-1 flex items-center">
                                <span className="mr-2 text-xl">&#8226;</span>
                                {participant.name}
                            </span>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedPodium;
