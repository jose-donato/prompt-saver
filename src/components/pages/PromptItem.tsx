import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Prompt, usePromptStore } from "@/lib/store";
import { copyToClipboard } from "@/lib/utils";
import {
	ChevronDown,
	ChevronUp,
	Copy,
	GripVertical,
	Trash,
} from "lucide-react";
import { forwardRef, useState } from "react";
import type { ConnectDragSource } from "react-dnd";
import { toast } from "sonner";

interface PromptItemProps {
	prompt: Prompt;
	dragHandleProps?: {
		ref: ConnectDragSource;
		[key: string]: unknown;
	};
}

export const PromptItem = forwardRef<HTMLDivElement, PromptItemProps>(
	({ prompt, dragHandleProps }, ref) => {
		const deletePrompt = usePromptStore((state) => state.deletePrompt);
		const [expanded, setExpanded] = useState(false);

		const handleCopy = () => {
			copyToClipboard(prompt.content);
			toast.success("Prompt copied to clipboard!");
		};

		const handleDelete = () => {
			deletePrompt(prompt.id);
			toast.success("Prompt deleted!");
		};

		const toggleExpanded = () => {
			setExpanded(!expanded);
		};

		// Split content into lines
		const lines = prompt.content.split("\n");

		// Check if we need to truncate (more than one line or first line is very long)
		const shouldTruncate = lines.length > 1 || lines[0].length > 100;

		// Create a preview that shows only the first line
		const createPreview = () => {
			if (!shouldTruncate || expanded) {
				return prompt.content;
			}

			// Get first line and truncate if too long
			let firstLine = lines[0];
			if (firstLine.length > 100) {
				firstLine = firstLine.substring(0, 100) + "...";
			}

			return firstLine + (lines.length > 1 ? "..." : "");
		};

		return (
			<Card ref={ref}>
				<CardHeader>
					<CardTitle className="flex justify-between items-center">
						{prompt.title}
						<div className="flex items-center gap-2">
							{dragHandleProps && (
								<Button
									variant="ghost"
									size="icon"
									className="cursor-grab active:cursor-grabbing"
									{...dragHandleProps}
								>
									<GripVertical className="h-4 w-4" />
								</Button>
							)}
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
					<div className="space-y-2">
						<pre className="text-sm font-sans whitespace-pre-wrap break-words">
							{createPreview()}
						</pre>
						{shouldTruncate && (
							<Button
								variant="outline"
								size="sm"
								onClick={toggleExpanded}
								className="flex items-center gap-1 text-xs w-full justify-center mt-2"
							>
								{expanded ? (
									<>
										Show less <ChevronUp className="h-3 w-3" />
									</>
								) : (
									<>
										Show more <ChevronDown className="h-3 w-3" />
									</>
								)}
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		);
	},
);

PromptItem.displayName = "PromptItem";
