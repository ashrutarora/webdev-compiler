import CodeEditor from "@/components/CodeEditor"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable"
import HelperHeader from "@/components/HelperHeader"
import CodeRender from "@/components/CodeRender"

export default function Compiler() {
  return (
    <ResizablePanelGroup
      direction="horizontal">
      <ResizablePanel defaultSize={50} className="min-w-[350px] h-[calc(100dvh-60px)]">
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="min-w-[350px] h-[calc(100dvh-60px)]">
        <CodeRender />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
