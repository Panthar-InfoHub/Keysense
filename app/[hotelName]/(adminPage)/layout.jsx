import ExtraNav from "@/components/ExtraNav";
import Navbar from "@/components/Navbar";


export default function RootLayout({ children }) {
    return (
        <div className="grid md:grid-cols-body min-h-screen w-full" >
            <Navbar />
            <main className="w-full overflow-x-hidden" >
                <div className="flex flex-col" >
                    <ExtraNav />
                    {children}
                </div>
            </main>
        </div>
    );
}
