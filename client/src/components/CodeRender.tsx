import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CodeRender() {
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);

    if (!fullCode || !fullCode.html) {
        return <div className="animate-pulse duration-50 text-red-500 font-mono text-lg">
HTML file cannot be empty!!
        </div>;
    }

    const combinedCode = `
    <html>
        <style>
        ${fullCode.css}
        </style>
        <body>
        ${fullCode.html}
        </body>
        <script>
        ${fullCode.javascript}
        </script>
    </html>
    `;

    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(combinedCode)}`
    return (
        <div className="w-full h-full border-l-green-500 border-2 pl-[0.8px]">
            <iframe src={iframeCode} className="w-full h-full" />
        </div>
    );
}
