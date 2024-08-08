import { toast } from "sonner";

export const handleError = (error: any) => {
  // console.log(error?.response?.data);
  // toast.error("Error :" + error.response.data);
  toast.error("Error :" + error.data.message, {
    className: "bg-red-600 text-white border border-red-700",
  });
};
