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
        <div className="w-full flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-2">
                Ranking da Escola da Nuvem
            </h1>
            {title && (
                <h2 className="text-2xl font-semibold mb-2">Turma:{title}</h2>
            )}
            {teacher && <h3 className="text-xl mb-8">Professor(a){teacher}</h3>}
            <AnimatedPodium data={data} podiumLimit={podiumLimit} />
        </div>
    );
};

export default RankingChart;
