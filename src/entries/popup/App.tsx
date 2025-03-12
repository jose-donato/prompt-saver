import { Toaster } from "sonner";
import { PromptLibrary } from "~/components/pages/PromptLibrary";

function App() {
	return (
		<>
			<main className="w-[400px] min-h-[600px] bg-zinc-950 text-white p-4 flex justify-between flex-col">
				<div className="flex flex-col gap-4">
					<nav className="flex items-center">
						<p className="text-white font-bold">Quick Prompt</p>
					</nav>
					<PromptLibrary />
				</div>
				<p className="text-xs text-zinc-400 mt-4 text-center">
					Code open source on{" "}
					<a
						href="https://github.com/jose-donato/quickprompt"
						target="_blank"
						rel="noreferrer"
						className="underline hover:text-white"
					>
						GitHub
					</a>
					.
				</p>
			</main>
			<Toaster richColors theme="dark" position="bottom-right" />
		</>
	);
}

export default App;
