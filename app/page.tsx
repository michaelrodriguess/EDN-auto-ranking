import Image from "next/image";
import RankingForm from "../components/RankingForm";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[url('/fundo1.jpeg')] bg-cover bg-center bg-no-repeat">
            <div className="w-full max-w-md p-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <header className="flex flex-col items-center mb-3">
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
                        />
                    </a>
                    <h2 className="text-lg font-bold text-center text-gray-500 mt-1">
                        Ranking Generator
                    </h2>
                </header>

                <section className="p-3">
                    <RankingForm />
                </section>
            </div>
        </main>
    );
}
