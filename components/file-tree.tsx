"use client"

import React, { useState } from "react"
import { Directory, File, sortDir, sortFile } from "@/utils/file-manager"
import clsx from "clsx"

import { getIcon } from "./icon"

interface FileTreeProps {
  rootDir: Directory
  selectedFile: File | undefined
  onSelect: (file: File) => void
}

export const FileTree = (props: FileTreeProps) => {
  return <SubTree directory={props.rootDir} {...props} />
}

interface SubTreeProps {
  directory: Directory
  selectedFile: File | undefined
  onSelect: (file: File) => void
}

const SubTree = (props: SubTreeProps) => {
  return (
    <div className="w-full">
      {props.directory.dirs.sort(sortDir).map((dir) => (
        <React.Fragment key={dir.id}>
          <DirDiv
            directory={dir}
            selectedFile={props.selectedFile}
            onSelect={props.onSelect}
          />
        </React.Fragment>
      ))}
      {props.directory.files.sort(sortFile).map((file) => (
        <React.Fragment key={file.id}>
          <FileDiv
            file={file}
            selectedFile={props.selectedFile}
            onClick={() => props.onSelect(file)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

const FileDiv = ({
  file,
  icon,
  selectedFile,
  onClick,
}: {
  file: File | Directory
  icon?: string
  selectedFile: File | undefined
  onClick: () => void
}) => {
  const isSelected = (selectedFile && selectedFile.id === file.id) as boolean
  const depth = file.depth
  return (
    <div
      className={clsx(
        "flex w-full items-center hover:cursor-pointer hover:bg-[#242424]",
        isSelected ? "bg-muted" : "transparent"
      )}
      style={{ paddingLeft: depth * 16 }}
      onClick={onClick}
    >
      <FileIcon name={icon} extension={file.name.split(".").pop() || ""} />
      <span
        className={clsx(
          "ml-[1px] w-full overflow-hidden text-ellipsis text-muted-foreground select-none",
          isSelected ? "text-primary" : ""
        )}
        style={{ color: isSelected ? "white" : "" }}
      >
        {file.name}
      </span>
    </div>
  )
}

const DirDiv = ({
  directory,
  selectedFile,
  onSelect,
}: {
  directory: Directory
  selectedFile: File | undefined
  onSelect: (file: File) => void
}) => {
  let defaultOpen = false
  if (selectedFile) defaultOpen = isChildSelected(directory, selectedFile)
  const [open, setOpen] = useState(defaultOpen)
  return (
    <>
      <FileDiv
        file={directory}
        icon={open ? "openDirectory" : "closedDirectory"}
        selectedFile={selectedFile}
        onClick={() => setOpen(!open)}
      />
      {open ? (
        <SubTree
          directory={directory}
          selectedFile={selectedFile}
          onSelect={onSelect}
        />
      ) : null}
    </>
  )
}

const isChildSelected = (directory: Directory, selectedFile: File) => {
  let res: boolean = false

  function isChild(dir: Directory, file: File) {
    if (selectedFile.parentId === dir.id) {
      res = true
      return
    }
    if (selectedFile.parentId === "0") {
      res = false
      return
    }
    dir.dirs.forEach((item) => {
      isChild(item, file)
    })
  }

  isChild(directory, selectedFile)
  return res
}

const FileIcon = ({
  extension,
  name,
}: {
  name?: string
  extension?: string
}) => {
  let icon = getIcon(extension || "", name || "")
  return (
    <span className="flex h-8 w-8 items-center justify-center">{icon}</span>
  )
}
