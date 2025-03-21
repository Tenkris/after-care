import { NextResponse } from "next/server";

type ClaudeMessage = {
  role: "user" | "assistant";
  content: string;
};

type ClaudeRequest = {
  model: string;
  system: string;
  messages: ClaudeMessage[];
  temperature: number;
  max_tokens: number;
};

// Set config for Vercel to increase timeout limit
export const maxDuration = 60; // Set to 60 seconds (maximum allowed for Hobby plans)
export const dynamic = "force-dynamic"; // Make sure the route is not statically optimized

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, system, messages, temperature, max_tokens } = body;

    // Validate required fields
    if (!model || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use API key from environment variable
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    // Format request for Claude API
    const claudeRequest = {
      model,
      system,
      messages,
      temperature: temperature || 0.7,
      max_tokens: max_tokens || 1024,
    };

    // Set timeout for fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // Set timeout to 55 seconds

    try {
      // Call Claude API with timeout controller
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(claudeRequest),
        signal: controller.signal,
      });

      // Clear the timeout
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Claude API error:", errorData);
        return NextResponse.json(
          { error: "Error from Claude API", details: errorData },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({ content: data.content[0].text });
    } catch (error) {
      // Clear the timeout in case of error
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout - Claude API took too long to respond" },
          { status: 504 }
        );
      }
      throw error; // Re-throw other errors to be caught by outer catch
    }
  } catch (error) {
    console.error("Error processing Claude request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
