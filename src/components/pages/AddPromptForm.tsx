import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePromptStore } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

export function AddPromptForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const addPrompt = usePromptStore((state) => state.addPrompt);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			toast.error("Please fill in all fields");
			return;
		}

		addPrompt({
			id: crypto.randomUUID(),
			title: title.trim(),
			content: content.trim(),
		});

		toast.success("Prompt saved!");

		// Reset form
		setTitle("");
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Input
					placeholder="Prompt Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<Textarea
					placeholder="Prompt Content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={5}
				/>
			</div>
			<Button type="submit" className="w-full">
				Save Prompt
			</Button>
		</form>
	);
}
