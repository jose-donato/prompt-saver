import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Prompt, usePromptStore } from "@/lib/store";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "../../lib/utils";

interface PromptItemProps {
	prompt: Prompt;
}

export function PromptItem({ prompt }: PromptItemProps) {
	const deletePrompt = usePromptStore((state) => state.deletePrompt);

	const handleCopy = () => {
		copyToClipboard(prompt.content);
		toast.success("Prompt copied to clipboard!");
	};

	const handleDelete = () => {
		deletePrompt(prompt.id);
		toast.success("Prompt deleted!");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					{prompt.title}
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" onClick={handleCopy}>
							<Copy className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" onClick={handleDelete}>
							<Trash className="h-4 w-4" />
						</Button>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm">{prompt.content.substring(0, 100)}...</p>
			</CardContent>
		</Card>
	);
}
