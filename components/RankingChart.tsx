"use client";

import React from "react";
import AnimatedPodium from "./AnimatedPodium";

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
        <>
            <div>
                {title && (
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                )}
                {teacher && <h3 className="text-xl mb-8">{teacher}</h3>}
            </div>
            <div className="w-full h-screen flex flex-col items-center justify-start p-4">
                <div className="flex-grow w-full z-50">
                    <AnimatedPodium data={data} podiumLimit={podiumLimit} />
                </div>
            </div>
        </>
    );
};

export default RankingChart;
