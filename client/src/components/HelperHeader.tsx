import { Button } from "./ui/button";
import { LoaderCircle, Save, Share2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Code } from "lucide-react";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useSaveCodeMutation } from "@/redux/slices/api";

export default function HelperHeader() {
  const navigate = useNavigate();
  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const handleSaveCode = async () => {
    try {
      if (fullCode && fullCode.html) {
        const response = await saveCode(fullCode).unwrap();
        navigate(`/compiler/${response.url}`, { replace: true });

        toast.success("Code Saved Successfully", {
          className: "bg-green-600 text-white border border-green-700",
        });
      } else {
        // Show error if fullCode or fullCode.html is empty
        toast.error("Cannot save empty file", {
          className: "bg-red-600 text-white border border-red-700",
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const dispatch = useDispatch();

  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-2">
        <Button
          variant="success"
          className="flex justify-center items-center gap-1"
          onClick={handleSaveCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Saving...</span>
              <LoaderCircle className="animate-spin" size={18} />
            </>
          ) : (
            <>
              <span>Save</span>
              <Save size={18} />
            </>
          )}
        </Button>
        {fullCode && fullCode.html ? (
          <Dialog>
            <DialogTrigger
              onClick={handleSaveCode}
              className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-400 hover:bg-blue-500 flex justify-center items-center gap-1"
            >
              Share
              <Share2 size={18} />
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex gap-1">
                  <Code className="pb-1 text-green-500" /> Share your code with
                  others!
                </DialogTitle>
                <DialogDescription className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-1 w-full">
                    <Input
                      disabled
                      value={window.location.href}
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    />
                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast.info("Link Copied to Clipboard", {
                          className:
                            "bg-sky-600 text-white border border-sky-700",
                        });
                      }}
                    >
                      <Copy size={20} />
                    </Button>
                  </div>
                  <span>Copy this link to share it</span>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            onClick={() =>
              toast.error("Cannot save empty file", {
                className: "bg-red-600 text-white border border-red-700",
              })
            }
            className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-400 hover:bg-blue-500 flex justify-center items-center gap-1"
          >
            Share
            <Share2 size={18} />
          </Button>
        )}
      </div>
      <div className="__tab_selector flex items-center gap-2">
        Language:
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[140px] bg-gray-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">
              <span className="flex gap-1">
                <img
                  className="size-5"
                  src="https://img.icons8.com/?size=100&id=20909&format=png&color=000000"
                />
                HTML
              </span>
            </SelectItem>
            <SelectItem value="css">
              <span className="flex gap-1">
                <img
                  className="size-5"
                  src="https://img.icons8.com/?size=100&id=21278&format=png&color=000000"
                />
                CSS
              </span>
            </SelectItem>
            <SelectItem value="javascript">
              <span className="flex gap-1">
                <img
                  className="size-5"
                  src="https://img.icons8.com/?size=100&id=108784&format=png&color=000000"
                />
                JavaScript
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
