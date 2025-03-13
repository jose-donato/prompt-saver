import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePromptStore } from "@/lib/store";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Example prompts that users can add to their library
const examplePrompts = [
	{
		id: "example-1",
		title: "Creative Writing Assistant",
		content:
			"I want you to act as a creative writing assistant. Help me develop engaging characters, compelling plots, and vivid settings for my story. Provide suggestions for overcoming writer's block and improving my narrative flow.",
	},
	{
		id: "example-2",
		title: "Code Reviewer",
		content:
			"I want you to act as a code reviewer. Analyze my code for bugs, security vulnerabilities, performance issues, and adherence to best practices. Suggest improvements and refactoring opportunities.",
	},
	{
		id: "example-3",
		title: "Learning Coach",
		content:
			"I want you to act as a learning coach for [subject]. Create a structured learning plan, recommend resources, provide practice exercises, and help me track my progress. Adapt your teaching style to my learning preferences.",
	},
	{
		id: "example-4",
		title: "Product Development Advisor",
		content:
			"I want you to act as a product development advisor. Help me refine my product idea, identify target users, develop features, and create a roadmap for development and launch. Provide insights on market trends and potential challenges.",
	},
];

export function PromptExamples() {
	const addPrompt = usePromptStore((state) => state.addPrompt);
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const handleAddToLibrary = (examplePrompt: (typeof examplePrompts)[0]) => {
		addPrompt({
			id: crypto.randomUUID(),
			title: examplePrompt.title,
			content: examplePrompt.content,
		});
		toast.success("Example prompt added to your library!");
	};

	const toggleExpanded = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
	};

	return (
		<div className="space-y-4">
			{examplePrompts.map((example) => (
				<Card key={example.id}>
					<CardHeader>
						<CardTitle className="flex justify-between items-center">
							{example.title}
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleAddToLibrary(example)}
								className="flex items-center gap-1"
							>
								<Plus className="h-4 w-4" /> Add to Library
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<pre className="text-sm font-sans whitespace-pre-wrap break-words">
								{expandedId === example.id
									? example.content
									: example.content.length > 100
										? `${example.content.substring(0, 100)}...`
										: example.content}
							</pre>
							{example.content.length > 100 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() => toggleExpanded(example.id)}
									className="flex items-center gap-1 text-xs w-full justify-center mt-2"
								>
									{expandedId === example.id ? (
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
			))}
		</div>
	);
}
