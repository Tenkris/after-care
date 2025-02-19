import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  // Format message content by preserving line breaks and handling lists
  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Skip empty lines
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Check if line starts with emoji (for section headers)
      const hasEmoji = /^[📌📜📄💡✨]/.test(line);

      // Check if line is a list item
      const isList = line.trim().startsWith("- ");

      if (hasEmoji) {
        return (
          <div key={index} className="font-medium text-base mt-2 mb-1">
            {line}
          </div>
        );
      } else if (isList) {
        return (
          <div key={index} className="flex gap-2 ml-2 my-0.5">
            <span>•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }

      return (
        <div key={index} className="my-0.5">
          {line}
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-4",
        message.role === "user" ? "flex-row-reverse" : ""
      )}
    >
      <Avatar
        className={cn(
          "h-8 w-8",
          message.role === "assistant" ? "bg-primary/10" : "bg-muted"
        )}
      >
        {message.role === "assistant" ? (
          <AvatarFallback className="text-primary">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>

      <div
        className={cn(
          "flex flex-col gap-2 rounded-lg px-4 py-2.5 text-base max-w-[80%] md:max-w-[70%]",
          message.role === "user"
            ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
            : "bg-muted rounded-tl-none"
        )}
      >
        {formatContent(message.content)}
      </div>
    </div>
  );
}
