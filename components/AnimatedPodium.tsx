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
    podiumLimit?: number;
}

const AnimatedPodium: React.FC<AnimatedPodiumProps> = ({
    data,
    podiumLimit = 3,
}) => {
    const sortedData = [...data].sort((a, b) => b.score - a.score);

    const baseHeight = 500;
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

    const containerWidth = Math.max(podiumLimit * 160, 800);

    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
            <div
                className="flex justify-center items-end"
                style={{ width: `${containerWidth}px` }}
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
                                className="z-[9999] flex flex-col items-center mx-0.5 flex-shrink-0 -mt-28 w-auto"
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
                                        className="w-24 sm:w-28 md:w-32 rounded-xl flex flex-col items-center justify-start p-2"
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
                                        <span className="text-white font-bold mb-1">
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
                                                    const formatName = (
                                                        name: string
                                                    ) => {
                                                        const parts =
                                                            name.split(" ");
                                                        if (
                                                            parts.length === 1
                                                        ) {
                                                            return (
                                                                parts[0]
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                parts[0].slice(
                                                                    1
                                                                )
                                                            );
                                                        } else {
                                                            const firstName =
                                                                parts[0];
                                                            const lastNameInitial =
                                                                parts[1]
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                ".";
                                                            return `${
                                                                firstName
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                firstName.slice(
                                                                    1
                                                                )
                                                            } ${lastNameInitial}`;
                                                        }
                                                    };

                                                    const formattedName =
                                                        formatName(
                                                            participant.name
                                                        );
                                                    const truncatedName =
                                                        formattedName.length >
                                                        10
                                                            ? formattedName.slice(
                                                                  0,
                                                                  10
                                                              ) + "..."
                                                            : formattedName;

                                                    return (
                                                        <span
                                                            key={`${index}-${pIndex}`}
                                                            className="text-gray-900 mb-1 flex items-center text-xs sm:text-sm"
                                                        >
                                                            <span className="mr-1 text-lg">
                                                                &#8226;
                                                            </span>
                                                            {truncatedName}
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
