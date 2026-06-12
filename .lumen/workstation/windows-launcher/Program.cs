using System.Diagnostics;

namespace Lumen.Workstation.Launcher;

internal static class Program
{
    private const string StartScriptName = "START_LUMEN_WORKSPACE.ps1";

    private static int Main(string[] args)
    {
        Console.Title = "Lumen Workstation";

        string root = ResolveRoot(args);
        string startScript = Path.Combine(root, StartScriptName);

        if (!File.Exists(startScript))
        {
            Console.Error.WriteLine("Lumen Workstation cannot start.");
            Console.Error.WriteLine($"Missing launcher script: {startScript}");
            Console.Error.WriteLine("Place LumenWorkstation.exe in the Lumen Genesis repository root or pass the root path as the first argument.");
            return 2;
        }

        string? pwsh = ResolvePwsh();
        if (pwsh is null)
        {
            Console.Error.WriteLine("PowerShell 7.6.2 is required, but pwsh.exe was not found on PATH.");
            return 3;
        }

        Console.WriteLine("Starting Lumen Workstation over Windows 11...");
        Console.WriteLine($"Root: {root}");
        Console.WriteLine($"PowerShell: {pwsh}");
        Console.WriteLine();

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = pwsh,
                WorkingDirectory = root,
                UseShellExecute = false,
                RedirectStandardOutput = false,
                RedirectStandardError = false,
                Arguments = $"-NoProfile -ExecutionPolicy Bypass -File \"{startScript}\""
            }
        };

        process.Start();
        process.WaitForExit();
        return process.ExitCode;
    }

    private static string ResolveRoot(string[] args)
    {
        if (args.Length > 0 && Directory.Exists(args[0]))
        {
            return Path.GetFullPath(args[0]);
        }

        string appDirectory = AppContext.BaseDirectory.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        if (File.Exists(Path.Combine(appDirectory, StartScriptName)))
        {
            return appDirectory;
        }

        string currentDirectory = Directory.GetCurrentDirectory();
        if (File.Exists(Path.Combine(currentDirectory, StartScriptName)))
        {
            return currentDirectory;
        }

        return appDirectory;
    }

    private static string? ResolvePwsh()
    {
        string[] candidates =
        [
            "pwsh.exe",
            Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Microsoft",
                "WindowsApps",
                "pwsh.exe")
        ];

        foreach (string candidate in candidates)
        {
            try
            {
                using var probe = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = candidate,
                        Arguments = "-NoProfile -Command \"$PSVersionTable.PSVersion.ToString()\"",
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true
                    }
                };

                probe.Start();
                string version = probe.StandardOutput.ReadToEnd().Trim();
                probe.WaitForExit(5000);

                if (probe.ExitCode == 0 && version.StartsWith("7.6.", StringComparison.Ordinal))
                {
                    return candidate;
                }
            }
            catch
            {
                // Try the next candidate.
            }
        }

        return null;
    }
}
