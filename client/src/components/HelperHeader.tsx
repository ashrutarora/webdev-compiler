import { Button } from "./ui/button";
import { LoaderCircle, Save, Share2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import { useDispatch, useSelector } from "react-redux";
import { CompilerSliceStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Code } from 'lucide-react';
import { Input } from "./ui/input";
import { Copy } from 'lucide-react';
import { toast } from "sonner";



export default function HelperHeader() {

    const [saveLoading, setSaveLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode)
    const handleSaveCode = async () => {
        setSaveLoading(true)
        try {
            const response = await axios.post("http://localhost:4000/compiler/save", {
                fullCode: fullCode
            })
            navigate(`/compiler/${response.data.url}`, { replace: true })
        } catch (error) {
            handleError(error)
        }
        finally {
            setSaveLoading(false)
        }
    }

    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)

    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-2">
                <Button
                    variant="success"
                    className="flex justify-center items-center gap-1"
                    onClick={handleSaveCode}
                    disabled={saveLoading}
                >
                    {saveLoading ? (
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
                <Dialog>
                    <DialogTrigger
                        onClick={handleSaveCode}
                        className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-400 hover:bg-blue-500 flex justify-center items-center gap-1">
                        Share
                        <Share2 size={18} />
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex gap-1">
                                <Code className="pb-1 text-green-500" /> Share your code with others!
                            </DialogTitle>
                            <DialogDescription className="flex flex-col items-center justify-center gap-2">
                                <div className="flex items-center justify-center gap-1 w-full">
                                    <Input
                                        disabled
                                        value={window.location.href}
                                        style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    />
                                    <Button variant="secondary"
                                        onClick={() => {
                                            window.navigator.clipboard.writeText(window.location.href)
                                            toast("Link Copied to Clipboard")
                                        }}>
                                        <Copy size={20} />
                                    </Button>
                                </div>
                                <span>Copy this link to share it</span>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>


            </div>
            <div className="__tab_selector flex items-center gap-2">
                Language:
                <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))
                }>
                    <SelectTrigger className="w-[140px] bg-gray-800 focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">
                            <span className="flex gap-1">
                                <img className="size-5" src="https://img.icons8.com/?size=100&id=20909&format=png&color=000000" />
                                HTML
                            </span>
                        </SelectItem>
                        <SelectItem value="css">
                            <span className="flex gap-1">
                                <img className="size-5" src="https://img.icons8.com/?size=100&id=21278&format=png&color=000000" />
                                CSS
                            </span>
                        </SelectItem>
                        <SelectItem value="javascript">
                            <span className="flex gap-1">
                                <img className="size-5" src="https://img.icons8.com/?size=100&id=108784&format=png&color=000000" />
                                JavaScript
                            </span>
                        </SelectItem>

                    </SelectContent>
                </Select>

            </div>
        </div>
    )
}
