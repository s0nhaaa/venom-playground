"use client"

import { File } from "@/utils/file-manager"
import Editor from "@monaco-editor/react"

export const Code = ({
  selectedFile,
}: // width,
{
  selectedFile: File | undefined
  // width: string
}) => {
  if (!selectedFile) return null

  const code = selectedFile.content
  let language = selectedFile.name.split(".").pop()

  if (language === "js" || language === "jsx") language = "javascript"
  else if (language === "ts" || language === "tsx") language = "typescript"

  return (
    <div className="h-full w-full">
      <Editor
        // width={"calc(100vw - 56px - " + width + ")"}
        // height={300}
        language={language}
        value={code}
        theme="vs-dark"
      />
    </div>
  )
}
