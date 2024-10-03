"use client";

import React from "react";
import AnimatedPodium from "./AnimatedPodium";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import Image from "next/image";

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
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col">
                    {title && (
                        <h2 className="text-xl text-black font-sans font-semibold">
                            {title}
                        </h2>
                    )}
                    {teacher && (
                        <h3 className="text-base font-mono text-black flex items-center">
                            <LiaChalkboardTeacherSolid className="mr-2 size-8 text-black mt-1" />
                            {teacher}
                        </h3>
                    )}
                </div>
                <a
                    href="https://escoladanuvem.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/logo-edn.webp"
                        alt="Escola da Nuvem Logo"
                        width={60}
                        height={60}
                        objectFit="contain"
                        className="-mt-16 border bg-blue-100 rounded-b-2xl"
                    />
                </a>
            </div>
            <div className="flex-grow w-full flex items-center justify-center p-2 ">
                <AnimatedPodium data={data} podiumLimit={podiumLimit} />
            </div>
        </div>
    );
};

export default RankingChart;
