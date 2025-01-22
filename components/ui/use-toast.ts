// Simplified version of the existing use-toast.ts
import { Toast } from "@/components/ui/toast"; // Correct the import based on the actual export

export { Toast };

export function useToast() {
  return {
    toast: (props: any) => {
      Toast(props);
    },
  };
}
