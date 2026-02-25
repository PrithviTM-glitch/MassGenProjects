"""
resolve_library_id - MCP tool wrapper

Auto-generated wrapper for the 'resolve-library-id' tool from the 'context7' MCP server.
This wrapper handles MCP protocol communication transparently.

Note: Original MCP tool name is 'resolve-library-id', Python function name is 'resolve_library_id'.
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


def resolve_library_id(query: str, libraryName: str) -> Any:
    """Resolves a package/product name to a Context7-compatible library ID and returns matching libraries.

    You MUST call this function before 'Query Documentation' tool to obtain a valid Context7-compatible library ID UNLESS the user explicitly provides a library ID in the format '/org/project' or '/org/project/version' in their query.

    Each result includes:
    - Library ID: Context7-compatible identifier (format: /org/project)
    - Name: Library or package name
    - Description: Short summary
    - Code Snippets: Number of available code examples
    - Source Reputation: Authority indicator (High, Medium, Low, or Unknown)
    - Benchmark Score: Quality indicator (100 is the highest score)
    - Versions: List of versions if available. Use one of those versions if the user provides a version in their query. The format of the version is /org/project/version.

    For best results, select libraries based on name match, source reputation, snippet coverage, benchmark score, and relevance to your use case.

    Selection Process:
    1. Analyze the query to understand what library/package the user is looking for
    2. Return the most relevant match based on:
    - Name similarity to the query (exact matches prioritized)
    - Description relevance to the query's intent
    - Documentation coverage (prioritize libraries with higher Code Snippet counts)
    - Source reputation (consider libraries with High or Medium reputation more authoritative)
    - Benchmark Score: Quality indicator (100 is the highest score)

    Response Format:
    - Return the selected library ID in a clearly marked section
    - Provide a brief explanation for why this library was chosen
    - If multiple good matches exist, acknowledge this but proceed with the most relevant one
    - If no good matches exist, clearly state this and suggest query refinements

    For ambiguous queries, request clarification before proceeding with a best-guess match.

    IMPORTANT: Do not call this tool more than 3 times per question. If you cannot find what you need after 3 calls, use the best result you have.

    Args:
        query (str): The question or task you need help with. This is used to rank library results by relevance to what the user is trying to accomplish. The query is sent to the Context7 API for processing. Do not include any sensitive or confidential information such as API keys, passwords, credentials, personal data, or proprietary code in your query.
        libraryName (str): Library name to search for and retrieve a Context7-compatible library ID.

    Returns:
        Any: Tool execution result from MCP server
    """
    return call_mcp_tool(
        server="context7",
        tool="resolve-library-id",
        arguments={
        "query": query,
        "libraryName": libraryName
            }
    )


if __name__ == "__main__":
    # CLI usage for testing
    import json

    # Simple CLI: pass first arg as location (or other primary param)
    if len(sys.argv) > 1:
        # For simple testing - assumes first param is primary argument
        result = resolve_library_id(sys.argv[1])
    else:
        print("Usage: python resolve_library_id.py <arguments>")
        print(f"\nDocumentation:\n{resolve_library_id.__doc__}")
        sys.exit(1)

    print(json.dumps(result, indent=2))
