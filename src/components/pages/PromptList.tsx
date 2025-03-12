import { usePromptStore } from "@/lib/store";
import type { Prompt } from "@/lib/store";
import { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PromptItem } from "./PromptItem";

type DraggablePromptItemProps = {
	prompt: Prompt;
	index: number;
	movePrompt: (dragIndex: number, hoverIndex: number) => void;
};

function DraggablePromptItem({
	prompt,
	index,
	movePrompt,
}: DraggablePromptItemProps) {
	const ref = useRef<HTMLDivElement>(null);
	const dragHandleRef = useRef<HTMLButtonElement>(null);

	const [{ isDragging }, drag, preview] = useDrag({
		type: "PROMPT",
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: "PROMPT",
		hover: (item: { index: number }, monitor) => {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;
			const hoverClientY = clientOffset.y - hoverRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			movePrompt(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	// Connect the drag handle to the drag source
	const dragHandleProps = {
		ref: drag,
	};

	// Connect the preview to the whole card
	preview(drop(ref));

	return (
		<div ref={ref} className={`${isDragging ? "opacity-50" : "opacity-100"}`}>
			<PromptItem prompt={prompt} dragHandleProps={dragHandleProps} />
		</div>
	);
}

export function PromptList() {
	const prompts = usePromptStore((state) => state.prompts);
	const reorderPrompts = usePromptStore((state) => state.reorderPrompts);

	const movePrompt = (dragIndex: number, hoverIndex: number) => {
		reorderPrompts(dragIndex, hoverIndex);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="space-y-4">
				{prompts.length === 0 ? (
					<p className="text-center text-gray-500">
						No prompts saved yet. Add some prompts to get started!
					</p>
				) : (
					prompts.map((prompt, index) => (
						<DraggablePromptItem
							key={prompt.id}
							prompt={prompt}
							index={index}
							movePrompt={movePrompt}
						/>
					))
				)}
			</div>
		</DndProvider>
	);
}
