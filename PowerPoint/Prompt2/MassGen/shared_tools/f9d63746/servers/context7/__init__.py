"""
context7 MCP Server Tools

Auto-generated module containing Python wrappers for all tools
from the 'context7' MCP server.

Available tools:
- resolve_library_id (MCP: resolve-library-id)
- query_docs (MCP: query-docs)

Usage:
    from servers.context7 import resolve_library_id
    result = resolve_library_id(...) if sanitized_names else "tool_name(...)"
"""

from .resolve_library_id import resolve_library_id
from .query_docs import query_docs

__all__ = ["resolve_library_id", "query_docs"]
