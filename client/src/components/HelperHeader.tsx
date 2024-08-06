import { Button } from "./ui/button";
import { Save, Share2 } from 'lucide-react';
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

export default function HelperHeader() {

    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode)
    const handleSaveCode = async () => {
        try {
            const response = await axios.post("http://localhost:4000/compiler/save", {
                fullCode: fullCode
            })
            console.log(response.data);
            
        } catch (error) {
            handleError(error)
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
                >
                    Save
                    <Save size={18} />
                </Button>

                <Button className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center gap-1">
                    Share
                    <Share2 size={18} />
                </Button>
            </div>
            <div className="__tab_selector flex items-center gap-2">
                Language:
                <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))
                }>
                    <SelectTrigger className="w-[120px] bg-gray-800 focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                </Select>

            </div>
        </div>
    )
}
