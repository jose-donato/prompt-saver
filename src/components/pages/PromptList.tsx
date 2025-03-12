import { usePromptStore } from "@/lib/store";
import { PromptItem } from "./PromptItem";

export function PromptList() {
	const prompts = usePromptStore((state) => state.prompts);

	return (
		<div className="space-y-4">
			{prompts.length === 0 ? (
				<p className="text-center text-gray-500">
					No prompts saved yet. Add some prompts to get started!
				</p>
			) : (
				prompts.map((prompt) => <PromptItem key={prompt.id} prompt={prompt} />)
			)}
		</div>
	);
}
