# Lumen Container Option

This is optional.

Purpose:
- isolate dependencies
- reduce host-machine drift
- preserve Windows 11
- keep Lumen workspace portable
- avoid reinstalling dependencies on every launch

Commands:
docker compose -f compose.lumen.yml up --build

This does not overwrite Windows.
