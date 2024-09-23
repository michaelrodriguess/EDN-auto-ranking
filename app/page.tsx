import Image from "next/image";
import RankingForm from "../components/RankingForm";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[url('/fundo1.jpeg')] bg-cover bg-center bg-no-repeat">
            <div className="w-full max-w-lg p-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <header className="flex flex-col items-center mb-4">
                    <a
                        href="https://escoladanuvem.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/logo-edn.webp"
                            alt="Escola da Nuvem Logo"
                            width={80}
                            height={80}
                            objectFit="contain"
                        />
                    </a>
                    <h2 className="text-2xl font-bold text-center text-gray-500 mt-2">
                        Ranking generator
                    </h2>
                </header>

                <section className="max-h-[70vh] overflow-auto p-4">
                    <RankingForm />
                </section>
            </div>
        </main>
    );
}
