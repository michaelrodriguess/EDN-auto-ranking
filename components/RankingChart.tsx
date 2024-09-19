"use client";

import React from "react";
import AnimatedPodium from "./AnimatedPodium";

interface Participant {
    name: string;
    score: number;
}

interface RankingChartProps {
    data: Participant[];
}

const RankingChart: React.FC<RankingChartProps> = ({ data }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-8">
                Ranking da Escola da Nuvem
            </h1>
            <AnimatedPodium data={data} podiumLimit={10} />
        </div>
    );
};

export default RankingChart;
