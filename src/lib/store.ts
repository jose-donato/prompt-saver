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
}

export const usePromptStore = create<PromptStore>()(
	persist(
		(set) => ({
			prompts: [],
			addPrompt: (prompt) =>
				set((state) => ({
					prompts: [...state.prompts, prompt],
				})),
			deletePrompt: (id) =>
				set((state) => ({
					prompts: state.prompts.filter((prompt) => prompt.id !== id),
				})),
		}),
		{
			name: "prompt-storage",
		},
	),
);
