"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

interface CsvRow {
    Student: string;
    "Current Score": string;
}

export default function RankingForm() {
    const [title, setTitle] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [topN, setTopN] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileParse = (file: File) => {
        Papa.parse(file, {
            complete: (result) => {
                const data = result.data as CsvRow[];
                console.log("Dados filtrados do CSV:");

                data.forEach((row, index) => {
                    console.log(
                        `Linha ${index + 1}: MemberNameI = ${
                            row.Student
                        }, ScoreIs = ${row["Current Score"]}`
                    );
                });
            },
            header: true,
            skipEmptyLines: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        handleFileParse(file);

        const queryString = new URLSearchParams({
            title,
            teacherName,
            topN,
        }).toString();

        router.push(`/ranking?${queryString}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="border-2 rounded-lg p-2">
                <div className="mb-4 mt-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Título da Turma
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Ex: AWS re:Start - 1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 p-2"
                    />
                </div>
                <div className="mb-4 mt-2">
                    <label
                        htmlFor="teacherName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Professor(a)
                    </label>
                    <input
                        type="text"
                        id="teacherName"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        required
                        placeholder="Nome do professor"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 p-2"
                    />
                </div>
                <div className="mb-4 mt-2">
                    <label
                        htmlFor="topN"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Quantas devem aparecer no ranking?
                    </label>
                    <input
                        type="number"
                        id="topN"
                        value={topN}
                        onChange={(e) => setTopN(e.target.value)}
                        required
                        min="1"
                        placeholder="Número de colunas"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 p-2"
                    />
                </div>
                <div className="mb-4 mt-2">
                    <div className="mt-1">
                        <input
                            type="file"
                            id="file"
                            accept=".csv"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                            required
                            className="hidden"
                        />
                        <label
                            htmlFor="file"
                            className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-blue-500 rounded-md text-blue-500 cursor-pointer hover:bg-blue-50 transition"
                        >
                            {file
                                ? file.name
                                : "Clique para fazer upload do arquivo CSV"}
                        </label>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Gerar Ranking
            </button>
        </form>
    );
}
