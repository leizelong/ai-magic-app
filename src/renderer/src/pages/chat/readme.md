curl http://localhost:11434/api/generate -d '{
  "model": "llama2:13b",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
