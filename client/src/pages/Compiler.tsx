import CodeEditor from "@/components/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import HelperHeader from "@/components/HelperHeader";
import CodeRender from "@/components/CodeRender";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { useLoadCodeMutation } from "@/redux/slices/api";

export default function Compiler() {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadExistingCode, {}] = useLoadCodeMutation();

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
      }
    } catch (error) {
      handleError(error);
      navigate("/*");
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={50}
        className="min-w-[350px] h-[calc(100dvh-60px)]"
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={50}
        className="min-w-[350px] h-[calc(100dvh-60px)]"
      >
        <CodeRender />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
