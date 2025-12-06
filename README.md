# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## OpenAI configuration

The AI flows now call OpenAI's chat completions API directly. Configure these environment variables before running the app:

- `OPENAI_API_KEY`: API key with access to vision-capable OpenAI models.
- `OPENAI_MODEL` (optional): Model identifier to use. Defaults to `gpt-4o-mini`.
- `OPENAI_API_URL` (optional): Override the API endpoint. Defaults to `https://api.openai.com/v1/chat/completions`.
