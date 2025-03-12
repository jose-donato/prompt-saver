import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddPromptForm } from "./AddPromptForm";
import { GeneratePromptForm } from "./GeneratePrompt";
import { PromptList } from "./PromptList";

export function PromptLibrary() {
	return (
		<Tabs defaultValue="list">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="list">Prompts</TabsTrigger>
				<TabsTrigger value="add">Add</TabsTrigger>
			</TabsList>
			<TabsContent value="list">
				<PromptList />
			</TabsContent>
			<TabsContent value="add">
				<AddPromptForm />
			</TabsContent>
		</Tabs>
	);
}
