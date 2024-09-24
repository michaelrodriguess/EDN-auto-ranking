"use client";

import React, { useEffect, useState } from "react";
import RankingChart from "../../components/RankingChart";

interface Participant {
    name: string;
    score: number;
}

const RankingPageContent: React.FC<{
    title: string;
    teacherName: string;
    topN: string;
}> = ({ title, teacherName, topN }) => {
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem("participants");
        if (storedData) {
            const formattedData = JSON.parse(storedData);
            setParticipants(formattedData);
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden">
            {participants.length > 0 ? (
                <>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Ranking da Escola da Nuvem
                        </h1>
                    </div>
                    <section className="w-full max-w-fit p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
                        <RankingChart
                            data={participants}
                            title={title}
                            teacher={teacherName}
                            podiumLimit={Number(topN)}
                        />
                    </section>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full size-4 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-xl">Carregando...</p>
                </div>
            )}
        </main>
    );
};

export default function RankingPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const title = (searchParams.title as string) || "";
    const teacherName = (searchParams.teacherName as string) || "";
    const topN = (searchParams.topN as string) || "";

    return (
        <RankingPageContent
            title={title}
            teacherName={teacherName}
            topN={topN}
        />
    );
}
