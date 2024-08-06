import CodeEditor from "@/components/CodeEditor"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable"
import HelperHeader from "@/components/HelperHeader"
import CodeRender from "@/components/CodeRender"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { handleError } from "@/utils/handleError"
import axios from "axios"
import { useDispatch } from "react-redux"
import { updateFullCode } from "@/redux/slices/compilerSlice"

export default function Compiler() {

  const { urlId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load",
        { urlId: urlId }
      )
      dispatch(updateFullCode(response.data.fullCode))

    } catch (error) {
      // handleError(error)
      navigate("/*")
    }
  }

  useEffect(() => {

    if (urlId) {

      loadCode()
    }

  }, [urlId])

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
