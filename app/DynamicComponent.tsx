"use client";
import * as Babel from "@babel/standalone";
import React, { useEffect, useRef } from "react";
import Highlight from "react-highlight";

export function DynamicComponent({
  componentString,
}: {
  componentString: string;
}) {
  try {
    // Transpile JSX to JavaScript
    const transformedCode = Babel.transform(componentString, {
      presets: ["react"],
    }).code;

    // Extract function names from the transformed code
    const functionNames = [];
    const functionRegex =
      /function\s+([A-Za-z0-9_]+)|const\s+([A-Za-z0-9_]+)\s*=\s*(?:\(\)|\(\w*\)|\(\w*,\s*\w*\)|\([^)]*\))\s*=>|const\s+([A-Za-z0-9_]+)\s*=\s*function\s*\(/g;
    let match;

    while ((match = functionRegex.exec(componentString)) !== null) {
      functionNames.push(match[1] || match[2] || match[3]);
    }

    // Create the component function from the transformed code
    // This function is dangerous considering it can execute arbitrary code
    // We have to trust the GPT to generate valid code.
    // If this were prod code, we would have to perform additional verification
    const ComponentFunction = new Function(
      "React",
      `${transformedCode}; return ${functionNames[0]};`
    )(React);

    return (
      <div className="flex flex-col gap-4 w-full">
        {React.createElement(ComponentFunction)}
        <CodeSnippet code={componentString} />
      </div>
    );
  } catch (error: any) {
    console.error("Error transforming code:", error);
    return <div>Error transforming code: {error.message}</div>;
  }
}

const CodeSnippet = ({ code }: { code: string }) => {
  return (
    <Highlight className="javascript rounded-lg h-96 overflow-y-auto">
      {code}
    </Highlight>
  );
};
