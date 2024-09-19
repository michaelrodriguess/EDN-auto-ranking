import Image from "next/image";
import RankingForm from "../components/RankingForm";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <Image
                        src="/logo-edn.webp"
                        alt="Escola da Nuvem Logo"
                        width={100}
                        height={100}
                        objectFit="contain"
                    />
                    <h2 className="text-2xl font-bold text-center text-blue-400 mt-4">
                        Ranking generator
                    </h2>
                </div>
                <RankingForm />
            </div>
        </main>
    );
}
