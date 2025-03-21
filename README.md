# AfterCare - Thai Medical Malpractice Legal Assistant

A Next.js application that provides AI-powered legal assistance for medical malpractice cases in Thailand.

## Features

- AI chatbot powered by Claude 3.7 Sonnet
- Specialized in Thai medical malpractice law
- Case analysis and severity assessment
- Case submission for further legal assistance
- Chat history persistence

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating `.env.local` with:
   ```
   CLAUDE_API_KEY=your_claude_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Replace `your_claude_api_key_here` with your actual Claude API key from Anthropic.
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Claude API Integration

The application uses Claude 3.7 Sonnet from Anthropic for natural language understanding and legal analysis. To configure the API:

1. Sign up for an API key at [Anthropic](https://www.anthropic.com/)
2. Add your API key to the `.env.local` file
3. The API is configured to use the latest Claude model (claude-3-5-sonnet-20240620)
4. System prompts are configured in `app/victim/chat/page.tsx`

## Project Structure

- `/app` - Next.js app directory
  - `/api` - API routes, including Claude API proxy
  - `/victim` - Routes for victims of medical malpractice
    - `/chat` - AI chat interface
- `/components` - Reusable React components
- `/lib` - Utility functions and types

## Customizing the AI Behavior

To modify the AI's behavior:

1. Update the `SYSTEM_PROMPT` in `app/victim/chat/page.tsx`
2. Modify `FEW_SHOT_EXAMPLES` for few-shot learning examples
3. Adjust the `analyzeCaseStrength` function to change case severity assessment

## License

[MIT](https://choosealicense.com/licenses/mit/)
