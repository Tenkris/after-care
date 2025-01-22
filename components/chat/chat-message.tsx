import { cn } from '@/lib/utils';

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
        'flex w-full max-w-[80%] md:max-w-[70%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
        message.role === 'user'
          ? 'ml-auto bg-primary text-primary-foreground'
          : 'bg-muted'
      )}
    >
      {message.content}
    </div>
  );
}
