"use client";

import { useState, useTransition } from "react";

export default function ClientSidePrompt({
  loadUsersAction,
}: {
  loadUsersAction: any;
}) {
  const [isPending, startTransition] = useTransition();
  const [generatedComponent, setGeneratedComponent] = useState();
  const [prompt, setPrompt] = useState("");

  const onClick = () => {
    startTransition(async () => {
      const data = await loadUsersAction(prompt);
      setGeneratedComponent(data);
    });
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex  items-center justify-center gap-4 w-full">
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-gray-100 p-4 text-sm text-gray-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn" onClick={onClick}>Generate Component</button>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-lg p-4 dark:border-neutral-800">
        {generatedComponent && generatedComponent}
      </div>
      <div></div>
    </div>
  );
}
