# Apify MCP Server Setup

## Configuration

Add the Apify MCP server to your `mcp_config.json` (typically at `~/.gemini/antigravity/mcp_config.json`):

```json
{
  "mcpServers": {
    "apify": {
      "$typeName": "exa.cascade_plugins_pb.CascadePluginCommandTemplate",
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server"
      ],
      "env": {
        "APIFY_TOKEN": "<YOUR_APIFY_API_TOKEN>"
      }
    }
  }
}
```

## Getting Your API Token

1. Go to [apify.com](https://apify.com) and sign up (free tier gives $5/month in credits)
2. Navigate to **Settings** → **Integrations** → **API tokens**
3. Create a new token or copy the existing one
4. Token format: `apify_api_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

## Available MCP Tools

Once configured, the following tools become available:

| Tool | Purpose |
|------|---------|
| `mcp_apify_call-actor` | Run any Apify actor with custom input |
| `mcp_apify_fetch-actor-details` | Get actor input schema and pricing |
| `mcp_apify_get-actor-output` | Retrieve results from a completed run |
| `mcp_apify_search-actors` | Find actors in the Apify Store |
| `mcp_apify_apify-slash-rag-web-browser` | Quick web search and scrape |

## Verifying Setup

After adding the config, restart your editor. Test by running:
```
mcp_apify_search-actors(keywords: "Google Maps", limit: 3)
```

If it returns actor results, the MCP server is working correctly.
