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
            <div className="w-full flex flex-col items-start">
                {title && (
                    <h2 className="text-xl text-black font-serif font-semibold flex items-center">
                        {title}
                    </h2>
                )}
                {teacher && (
                    <h3 className="text-base font-mono text-black flex items-center">
                        <LiaChalkboardTeacherSolid className="mr-2 text-black" />{" "}
                        {teacher}
                    </h3>
                )}
            </div>
            <div className="w-full flex-grow flex flex-col items-center justify-start p-1">
                <div className="w-full z-50">
                    <AnimatedPodium data={data} podiumLimit={podiumLimit} />
                </div>
            </div>
        </div>
    );
};

export default RankingChart;
