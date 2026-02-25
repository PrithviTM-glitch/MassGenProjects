"""
MCP Server Tools

Auto-generated Python wrappers for MCP tools.

Available servers:
- context7

Usage:
    # Import tools from servers
    from servers.weather import get_weather
    from servers.github import create_issue

    # Use the tools
    weather = get_weather("London")

Discover tools via filesystem:
    ls servers/                          # List available servers
    ls servers/weather/                  # List tools in a server
    cat servers/weather/get_weather.py   # Read tool docstring and code
"""

# This file makes servers/ a Python package.
# Agents discover tools using filesystem commands: ls, cat, grep
