"""
MCP Client for Tool Execution

This module handles MCP protocol communication for tool wrappers.
It's hidden from agents - they only interact with tool wrappers in servers/.

DO NOT MODIFY THIS FILE - it's auto-generated and managed by MassGen.
"""

import asyncio
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict, Optional

# Import MassGen's MCP client infrastructure
try:
    from massgen.mcp_tools.client import MCPClient
    from massgen.logger_config import logger
    MCP_AVAILABLE = True
except ImportError:
    # Fallback for standalone usage
    print("Warning: MassGen MCP client not available", file=sys.stderr)
    MCPClient = None
    MCP_AVAILABLE = False

    class _FakeLogger:
        def info(self, *args, **kwargs): pass
        def warning(self, *args, **kwargs): pass
        def error(self, *args, **kwargs): pass
    logger = _FakeLogger()


# Load server configurations
_config_path = Path(__file__).parent / 'servers.json'
if _config_path.exists():
    with open(_config_path) as f:
        SERVERS = json.load(f)
else:
    SERVERS = {}


# Global MCP client instance (created on first use)
_mcp_client: Optional[MCPClient] = None
_client_lock = asyncio.Lock()


async def _ensure_client() -> MCPClient:
    """Ensure MCP client is connected and ready.

    Returns:
        Connected MCPClient instance

    Raises:
        RuntimeError: If MCP client unavailable or connection fails
    """
    global _mcp_client

    if not MCP_AVAILABLE:
        raise RuntimeError("MassGen MCP client not available")

    async with _client_lock:
        if _mcp_client is None:
            # Convert server configs to list format expected by MCPClient
            server_configs = [
                {
                    "name": name,
                    "type": config.get("type", "stdio"),
                    "command": config.get("command"),
                    "args": config.get("args", []),
                    "env": config.get("env", {}),
                    "url": config.get("url"),
                }
                for name, config in SERVERS.items()
            ]

            if not server_configs:
                raise RuntimeError("No MCP servers configured in servers.json")

            logger.info(f"[MCP Client] Connecting to {len(server_configs)} server(s)")

            # Create and connect MCP client
            _mcp_client = await MCPClient.create_and_connect(
                server_configs=server_configs,
                timeout_seconds=30
            )

            logger.info(f"[MCP Client] Connected successfully, {len(_mcp_client.tools)} tools available")

        return _mcp_client


def call_mcp_tool(server: str, tool: str, arguments: Dict[str, Any]) -> Any:
    """Execute an MCP tool call (synchronous wrapper).

    This function manages MCP connections and handles protocol details.
    Agents never call this directly - they use the tool wrappers.

    Args:
        server: MCP server name
        tool: Tool name
        arguments: Tool arguments dict

    Returns:
        Tool execution result

    Raises:
        ValueError: If server not configured or tool not found
        RuntimeError: If MCP client unavailable or call fails
    """
    # Run async call safely (handles both sync and nested async contexts)
    from massgen.utils import run_async_safely

    return run_async_safely(call_mcp_tool_async(server, tool, arguments))


async def call_mcp_tool_async(server: str, tool: str, arguments: Dict[str, Any]) -> Any:
    """Execute an MCP tool call (async version).

    Args:
        server: MCP server name
        tool: Tool name
        arguments: Tool arguments dict

    Returns:
        Tool execution result

    Raises:
        ValueError: If server not configured or tool not found
        RuntimeError: If MCP call fails
    """
    if server not in SERVERS:
        raise ValueError(
            f"MCP server '{server}' not configured. "
            f"Available servers: {list(SERVERS.keys())}"
        )

    # Ensure client is connected
    client = await _ensure_client()

    # Build prefixed tool name (as used by MCPClient)
    prefixed_tool_name = f"mcp__{server}__{tool}"

    # Execute tool via MCP protocol
    try:
        logger.info(f"[MCP Client] Calling {server}.{tool}")
        result = await client.call_tool(prefixed_tool_name, arguments)
        return result
    except Exception as e:
        logger.error(f"[MCP Client] Error calling {server}.{tool}: {e}")
        raise RuntimeError(
            f"Error calling {server}.{tool}: {str(e)}"
        ) from e


def list_servers() -> list:
    """List all configured MCP servers."""
    return list(SERVERS.keys())


def get_server_config(server: str) -> Dict[str, Any]:
    """Get configuration for a specific server."""
    return SERVERS.get(server, {})


async def cleanup():
    """Cleanup MCP client connections."""
    global _mcp_client
    if _mcp_client is not None:
        await _mcp_client.cleanup()
        _mcp_client = None
