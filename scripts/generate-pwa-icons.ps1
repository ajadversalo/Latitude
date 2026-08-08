Add-Type -AssemblyName System.Drawing

$outputDirectory = Join-Path $PSScriptRoot "..\public\icons"
[System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null

function New-LatitudeIcon {
  param([int]$Size, [string]$Name, [bool]$Maskable)

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml("#18223c"))

  $padding = if ($Maskable) { [int]($Size * 0.22) } else { [int]($Size * 0.14) }
  $markSize = $Size - ($padding * 2)
  $radius = [int]($markSize * 0.14)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2
  $path.AddArc($padding, $padding, $diameter, $diameter, 180, 90)
  $path.AddArc($padding + $markSize - $diameter, $padding, $diameter, $diameter, 270, 90)
  $path.AddArc($padding + $markSize - $diameter, $padding + $markSize - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($padding, $padding + $markSize - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#a9c5ff"))
  $graphics.FillPath($brush, $path)

  $fontSize = [single]($markSize * 0.58)
  $font = New-Object System.Drawing.Font("Arial", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#18223c"))
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $graphics.DrawString("L", $font, $textBrush, [System.Drawing.RectangleF]::new($padding, $padding, $markSize, $markSize), $format)

  $bitmap.Save((Join-Path $outputDirectory $Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $format.Dispose(); $textBrush.Dispose(); $font.Dispose(); $brush.Dispose(); $path.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
}

New-LatitudeIcon -Size 192 -Name "icon-192.png" -Maskable $false
New-LatitudeIcon -Size 512 -Name "icon-512.png" -Maskable $false
New-LatitudeIcon -Size 512 -Name "icon-maskable-512.png" -Maskable $true
New-LatitudeIcon -Size 180 -Name "apple-touch-icon.png" -Maskable $false
