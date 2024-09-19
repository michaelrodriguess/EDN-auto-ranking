"use client";

import React, { useEffect, useState } from "react";
import RankingChart from "../../components/RankingChart";

interface Participant {
    name: string;
    score: number;
}

const mockData: Participant[] = [
    { name: "Luiz Gustavo", score: 100 },
    { name: "Maria DB", score: 100 },
    { name: "João Silva", score: 100 },
    { name: "Ana Souza", score: 98 },
    { name: "Carlos Santos", score: 97 },
    { name: "Levi de Assis", score: 99 },
    { name: "Lucas Oliveira", score: 85 },
    { name: "Michael Rodr", score: 80 },
    { name: "Joseph couto", score: 99 },
    { name: "Irinei naldo1", score: 80 },
    { name: "jacinto", score: 50 },
    { name: "jacinto", score: 40 },
    { name: "jacinto", score: 60 },
    { name: "jacinto", score: 70 },
];

const RankingPageContent: React.FC = () => {
    const [data, setData] = useState<Participant[]>([]);

    useEffect(() => {
        setData(mockData);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                {data.length > 0 ? (
                    <RankingChart data={data} />
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </main>
    );
};

export default function RankingPage() {
    return <RankingPageContent />;
}
