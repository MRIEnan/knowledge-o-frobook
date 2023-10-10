import { toast } from "@/components/ui/use-toast";

// todo: show notification
export const handleToast = ({
  title = "title",
  description = "description",
  duration = 3000,
}: {
  title?: string;
  description?: string;
  duration?: number;
}) => {
  toast({
    duration: duration,
    description: description,
    title: title,
  });
};
