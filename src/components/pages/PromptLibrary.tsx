import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPromptForm } from "./AddPromptForm";
import { PromptExamples } from "./PromptExamples";
import { PromptList } from "./PromptList";

export function PromptLibrary() {
	return (
		<Tabs defaultValue="list">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="list">Prompts</TabsTrigger>
				<TabsTrigger value="examples">Examples</TabsTrigger>
				<TabsTrigger value="add">Add</TabsTrigger>
			</TabsList>
			<TabsContent value="list">
				<PromptList />
			</TabsContent>
			<TabsContent value="examples">
				<PromptExamples />
			</TabsContent>
			<TabsContent value="add">
				<AddPromptForm />
			</TabsContent>
		</Tabs>
	);
}
