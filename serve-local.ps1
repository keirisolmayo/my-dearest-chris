$ErrorActionPreference = "Stop"
$root = [System.IO.Path]::GetFullPath($PSScriptRoot)
$listener = [System.Net.HttpListener]::new()
$portProbe = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)

try {
    $portProbe.Start()
    $port = ([System.Net.IPEndPoint]$portProbe.LocalEndpoint).Port
    $portProbe.Stop()

    $prefix = "http://127.0.0.1:$port/"
    $listener.Prefixes.Add($prefix)
    try {
        $listener.Start()
    }
    catch {
        throw "Unable to start the local website server at $prefix. $_"
    }

    $url = "${prefix}index.html"
    Start-Process $url
    Write-Host "Website opened at $url"
    Write-Host "Keep this window open while using the website. Press Ctrl+C to stop."

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $relativePath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
            if ([string]::IsNullOrWhiteSpace($relativePath)) {
                $relativePath = "index.html"
            }

            $filePath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath.Replace("/", "\")))
            $rootPrefix = $root.TrimEnd("\") + "\"
            if (-not $filePath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
                $context.Response.StatusCode = 403
                continue
            }
            if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
                $context.Response.StatusCode = 404
                continue
            }

            $context.Response.ContentType = switch ([System.IO.Path]::GetExtension($filePath).ToLowerInvariant()) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".mp3"  { "audio/mpeg" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $context.Response.ContentLength64 = $bytes.Length
            if ($context.Request.HttpMethod -ne "HEAD") {
                $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        }
        catch {
            $context.Response.StatusCode = 500
            Write-Error "Unable to serve a local website file: $_"
        }
        finally {
            $context.Response.Close()
        }
    }
}
finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
