import { toast } from "sonner";

export const handleError = (error: any) => {
  console.log(error?.response);
  toast.error("Error :" + error.response.data);
};
