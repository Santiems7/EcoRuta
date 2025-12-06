# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## OpenAI configuration

The AI flows now call OpenAI's chat completions API directly. Configure these environment variables before running the app:

- `OPENAI_API_KEY`: API key with access to vision-capable OpenAI models.
- `OPENAI_MODEL` (optional): Model identifier to use. Defaults to `gpt-4o-mini`.
- `OPENAI_API_URL` (optional): Override the API endpoint. Defaults to `https://api.openai.com/v1/chat/completions`.

## Free/local configuration (sin cobros)

Para evitar costos puedes usar un proveedor local o gratuito compatible con la API de OpenAI (por ejemplo, Ollama con `llava`).
Activa el modo gratuito con estas variables de entorno:

- `AI_PROVIDER=local` o `USE_FREE_AI=true`
- `FREE_OPENAI_API_URL` (opcional): endpoint compatible. Ejemplo para Ollama: `http://localhost:11434/v1/chat/completions`.
- `FREE_VISION_MODEL` (opcional): nombre del modelo. Ejemplo: `llava:latest`.
- `FREE_OPENAI_API_KEY` (opcional): token si tu proxy gratuito lo requiere. Si está en blanco, no se envía cabecera `Authorization`.

Las imágenes ya se envían como data URI Base64; si tu modelo gratuito no acepta URLs remotas, mantén el formato `data:image/<tipo>;base64,<datos>` para que pueda procesarlas.
