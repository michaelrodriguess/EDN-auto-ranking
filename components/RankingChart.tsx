"use client";

import React from "react";
import AnimatedPodium from "./AnimatedPodium";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

interface Participant {
    name: string;
    score: number;
}

interface RankingChartProps {
    data: Participant[];
    title?: string;
    teacher?: string;
    podiumLimit: number;
}

const RankingChart: React.FC<RankingChartProps> = ({
    data,
    title,
    teacher,
    podiumLimit,
}) => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col items-start mb-4">
                {title && (
                    <h2 className="text-xl text-black font-serif font-semibold flex items-center">
                        {title}
                    </h2>
                )}
                {teacher && (
                    <h3 className="text-base font-mono text-black flex items-center">
                        <LiaChalkboardTeacherSolid className="mr-2 text-black" />
                        {teacher}
                    </h3>
                )}
            </div>
            <div className="flex-grow w-full flex items-center justify-center p-1">
                <AnimatedPodium data={data} podiumLimit={podiumLimit} />
            </div>
        </div>
    );
};

export default RankingChart;
