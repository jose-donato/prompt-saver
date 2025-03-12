import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Prompt {
	id: string;
	title: string;
	content: string;
}

interface PromptStore {
	prompts: Prompt[];
	addPrompt: (prompt: Prompt) => void;
	deletePrompt: (id: string) => void;
	reorderPrompts: (sourceIndex: number, destinationIndex: number) => void;
}

export const usePromptStore = create<PromptStore>()(
	persist(
		(set) => ({
			prompts: [],
			addPrompt: (prompt) =>
				set((state) => ({
					prompts: [prompt, ...state.prompts],
				})),
			deletePrompt: (id) =>
				set((state) => ({
					prompts: state.prompts.filter((prompt) => prompt.id !== id),
				})),
			reorderPrompts: (sourceIndex, destinationIndex) =>
				set((state) => {
					const newPrompts = [...state.prompts];
					const [movedPrompt] = newPrompts.splice(sourceIndex, 1);
					newPrompts.splice(destinationIndex, 0, movedPrompt);
					return { prompts: newPrompts };
				}),
		}),
		{
			name: "prompt-storage",
		},
	),
);
