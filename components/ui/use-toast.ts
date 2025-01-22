// Simplified version of the existing use-toast.ts
import { toast } from "@/components/ui/toast"

export { toast }

export function useToast() {
  return {
    toast: (props: any) => {
      toast(props)
    },
  }
}
