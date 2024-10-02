import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { PiHandsClappingDuotone } from "react-icons/pi";

interface Participant {
    name: string;
    score: number;
}

interface AnimatedPodiumProps {
    data: Participant[];
    podiumLimit?: number;
}

const AnimatedPodium: React.FC<AnimatedPodiumProps> = ({
    data,
    podiumLimit = 3,
}) => {
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    const baseHeight = 600;
    const heightDecrement = 20;
    const minHeight = 100;

    const groupedData: Participant[][] = sortedData.reduce(
        (acc: Participant[][], curr) => {
            const position =
                acc.length === 0 || curr.score < acc[acc.length - 1][0].score
                    ? acc.length + 1
                    : acc.length;
            if (!acc[position - 1]) {
                acc[position - 1] = [];
            }
            acc[position - 1].push(curr);
            return acc;
        },
        []
    );

    const getIconForPosition = (position: number) => {
        if (position === 0)
            return <FaTrophy className="text-[#FFD700]" size={30} />;
        if (position === 1)
            return <FaMedal className="text-gray-400" size={26} />;
        if (position === 2)
            return <FaMedal className="text-[#CE8946]" size={26} />;

        return <PiHandsClappingDuotone className="text-green-800" size={24} />;
    };

    const reorderPodium = (data: Participant[][], limit: number) => {
        const reordered = new Array(limit);
        const middleIndex = Math.floor(limit / 2);

        reordered[middleIndex] = data[0];

        let leftIndex = middleIndex - 1;
        let rightIndex = middleIndex + 1;
        let currentPosition = 1;

        while (currentPosition < data.length) {
            if (leftIndex >= 0) {
                reordered[leftIndex] = data[currentPosition];
                currentPosition++;
                leftIndex--;
            }
            if (rightIndex < limit && currentPosition < data.length) {
                reordered[rightIndex] = data[currentPosition];
                currentPosition++;
                rightIndex++;
            }
        }

        for (let i = 0; i < limit; i++) {
            if (!reordered[i]) {
                reordered[i] = [];
            }
        }

        return reordered;
    };

    const reorderedData = reorderPodium(
        groupedData.slice(0, podiumLimit),
        podiumLimit
    );

    const formatName = (name: string, maxChars: number) => {
        const [lastName, rest] = name.split(",").map((part) => part.trim());
        const nameParts = rest.split(" ");
        const firstName = nameParts[0];
        const fullName = `${firstName} ${lastName} `.trim();

        return fullName.length > maxChars
            ? fullName.slice(0, maxChars) + "..."
            : fullName;
    };

    const [maxChars, setMaxChars] = useState(10);
    const podiumRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (podiumRef.current) {
            const columnWidth = podiumRef.current.offsetWidth / podiumLimit;
            const newMaxChars = Math.floor(columnWidth / 8);
            setMaxChars(newMaxChars);
        }
    }, [podiumLimit, reorderedData]);

    return (
        <div className="flex flex-col items-center w-full max-w-6xl ">
            <div
                ref={podiumRef}
                className="flex justify-center items-end w-full"
            >
                {reorderedData
                    .filter((group) => group.length > 0)
                    .map((group, index) => {
                        const originalIndex = groupedData.findIndex(
                            (g) => g === group
                        );
                        const isMiddle = index === Math.floor(podiumLimit / 2);
                        const distanceFromMiddle = Math.abs(
                            index - Math.floor(podiumLimit / 2)
                        );
                        const podiumHeight = Math.max(
                            isMiddle
                                ? baseHeight
                                : baseHeight -
                                      distanceFromMiddle * heightDecrement,
                            minHeight
                        );

                        return (
                            <motion.div
                                key={index}
                                className="z-[9999] -mt-16 flex flex-col items-center mx-px flex-grow flex-1 min-w-0"
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <div className="size-12 rounded-full overflow-hidden border-2 border-white bg-gray-200 flex items-center justify-center text-gray-700 font-bold mb-4">
                                    {getIconForPosition(originalIndex)}
                                </div>
                                {group.length > 0 && (
                                    <motion.div
                                        className="w-full rounded-xl flex flex-col items-center justify-start p-2 border border-white border-opacity-30"
                                        style={{
                                            backgroundColor:
                                                originalIndex === 0
                                                    ? "#FFD700"
                                                    : originalIndex === 1
                                                    ? "#9CA3AF"
                                                    : originalIndex === 2
                                                    ? "#CE8946"
                                                    : "#ECECA3",
                                            height: `${podiumHeight}px`,
                                        }}
                                        initial={{ height: 0 }}
                                        animate={{
                                            height: `${podiumHeight}px`,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <span className="text-white font-bold mb-1 text-sm sm:text-base">
                                            {group[0].score}%
                                        </span>
                                        <div className="w-full border border-white mb-2" />
                                        {group
                                            .sort(
                                                (
                                                    a: Participant,
                                                    b: Participant
                                                ) =>
                                                    a.name.localeCompare(b.name)
                                            )
                                            .map(
                                                (
                                                    participant: Participant,
                                                    pIndex: number
                                                ) => {
                                                    const formattedName =
                                                        formatName(
                                                            participant.name,
                                                            maxChars
                                                        );

                                                    return (
                                                        <span
                                                            key={`${index}-${pIndex}`}
                                                            className="text-gray-900 mb-1 flex items-center text-base"
                                                        >
                                                            <span className="mr-1 text-base">
                                                                &#8226;
                                                            </span>
                                                            {formattedName}
                                                        </span>
                                                    );
                                                }
                                            )}
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
            </div>
        </div>
    );
};

export default AnimatedPodium;
