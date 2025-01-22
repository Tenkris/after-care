import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 mb-4',
        message.role === 'user' ? 'flex-row-reverse' : ''
      )}
    >
      <Avatar className={cn(
        'h-8 w-8',
        message.role === 'assistant' ? 'bg-primary/10' : 'bg-muted'
      )}>
        {message.role === 'assistant' ? (
          <AvatarFallback className="text-primary">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className={cn(
        'flex flex-col gap-2 rounded-lg px-4 py-2.5 text-sm max-w-[80%] md:max-w-[70%]',
        message.role === 'user'
          ? 'bg-primary text-primary-foreground ml-auto rounded-tr-none'
          : 'bg-muted rounded-tl-none'
      )}>
        {message.content}
      </div>
    </div>
  );
}
