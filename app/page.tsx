"use client"

import { useRef, useState } from "react"
import { Code } from "@/editor/code"
import { Directory, File, Type, findFileByName } from "@/utils/file-manager"
import { Files, FlaskConical, Settings } from "lucide-react"
import { useResizable } from "react-resizable-layout"

import { useFilesFromSandbox } from "@/hooks/useFilesFromSandbox"
import { Button } from "@/components/ui/button"
import { FileTree } from "@/components/file-tree"
import { ResizeSeparator } from "@/components/resize-separator"

const CURRENT_SANDBOX_ID =
  "framer-motion-animatesharedlayout-gallery-demo-forked-b6j254"

const dummyDir: Directory = {
  id: "1",
  name: "loading...",
  type: Type.DUMMY,
  parentId: undefined,
  depth: 0,
  dirs: [],
  files: [],
}

export default function IndexPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [rootDir, setRootDir] = useState(dummyDir)
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  useFilesFromSandbox(CURRENT_SANDBOX_ID, (root) => {
    if (!selectedFile) {
      setSelectedFile(findFileByName(root, "index.tsx"))
    }
    setRootDir(root)
  })

  const onSelect = (file: File) => setSelectedFile(file)

  const { position: terminalH, separatorProps: terminalDragBarProps } =
    useResizable({
      axis: "y",
      initial: 150,
      min: 25,
      reverse: true,
      containerRef: ref,
    })
  const { position: fileW, separatorProps: fileDragBarProps } = useResizable({
    axis: "x",
    initial: 250,
    min: 150,
    shiftStep: 25,
    containerRef: ref,
  })

  return (
    <section className="h-screen w-full">
      <div className="layout-container h-full w-full">
        <div className="layout-header border-[2px] border-secondary"></div>
        <div className="layout-tab flex  flex-col justify-between border-x-[2px] border-secondary p-1">
          <div className="flex flex-col ">
            <Button size="default" variant={"ghost"} className="w-full px-2">
              <Files size={18} />
            </Button>
            <Button size="default" variant={"ghost"} className="w-full px-2">
              <FlaskConical size={18} />
            </Button>
          </div>
          <div>
            <Button size="default" variant={"ghost"} className="w-full px-2">
              <Settings size={18} />
            </Button>
          </div>
        </div>

        <div ref={ref} className="layout-ide border-x-[2px] border-secondary">
          <div className="color-white flex h-full w-full flex-col overflow-hidden ">
            <div className="flex grow">
              <div className="shrink-0" style={{ width: fileW }}>
                <div className=" w-full">
                  <FileTree
                    rootDir={rootDir}
                    selectedFile={selectedFile}
                    onSelect={onSelect}
                  />
                </div>
              </div>
              <ResizeSeparator direction="vertical" {...fileDragBarProps} />
              <div className="flex grow flex-col">
                <div className="grow">
                  <Code
                    selectedFile={selectedFile}
                    // width={`${fileW}px`}
                  />
                </div>
                <ResizeSeparator
                  direction="horizontal"
                  {...terminalDragBarProps}
                />
                <div className=" shrink-0" style={{ height: terminalH }}>
                  Terminal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
