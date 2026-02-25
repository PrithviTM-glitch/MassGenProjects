"""
query_docs - MCP tool wrapper

Auto-generated wrapper for the 'query-docs' tool from the 'context7' MCP server.
This wrapper handles MCP protocol communication transparently.

Note: Original MCP tool name is 'query-docs', Python function name is 'query_docs'.
"""

from typing import Any, Dict, Optional
import sys
import os
from pathlib import Path

# Add .mcp to path for MCP client
_mcp_path = Path(__file__).parent.parent.parent / '.mcp'
if str(_mcp_path) not in sys.path:
    sys.path.insert(0, str(_mcp_path))

from client import call_mcp_tool


def query_docs(libraryId: str, query: str) -> Any:
    """Retrieves and queries up-to-date documentation and code examples from Context7 for any programming library or framework.

    You must call 'Resolve Context7 Library ID' tool first to obtain the exact Context7-compatible library ID required to use this tool, UNLESS the user explicitly provides a library ID in the format '/org/project' or '/org/project/version' in their query.

    IMPORTANT: Do not call this tool more than 3 times per question. If you cannot find what you need after 3 calls, use the best information you have.

    Args:
        libraryId (str): Exact Context7-compatible library ID (e.g., '/mongodb/docs', '/vercel/next.js', '/supabase/supabase', '/vercel/next.js/v14.3.0-canary.87') retrieved from 'resolve-library-id' or directly from user query in the format '/org/project' or '/org/project/version'.
        query (str): The question or task you need help with. Be specific and include relevant details. Good: 'How to set up authentication with JWT in Express.js' or 'React useEffect cleanup function examples'. Bad: 'auth' or 'hooks'. The query is sent to the Context7 API for processing. Do not include any sensitive or confidential information such as API keys, passwords, credentials, personal data, or proprietary code in your query.

    Returns:
        Any: Tool execution result from MCP server
    """
    return call_mcp_tool(
        server="context7",
        tool="query-docs",
        arguments={
        "libraryId": libraryId,
        "query": query
            }
    )


if __name__ == "__main__":
    # CLI usage for testing
    import json

    # Simple CLI: pass first arg as location (or other primary param)
    if len(sys.argv) > 1:
        # For simple testing - assumes first param is primary argument
        result = query_docs(sys.argv[1])
    else:
        print("Usage: python query_docs.py <arguments>")
        print(f"\nDocumentation:\n{query_docs.__doc__}")
        sys.exit(1)

    print(json.dumps(result, indent=2))
