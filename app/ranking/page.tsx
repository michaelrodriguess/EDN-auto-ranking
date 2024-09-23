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
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                {participants.length > 0 ? (
                    <RankingChart
                        data={participants}
                        title={title}
                        teacher={teacherName}
                        podiumLimit={Number(topN)}
                    />
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
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
