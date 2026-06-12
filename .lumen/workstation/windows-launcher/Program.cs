using System.Diagnostics;
using System.Text.Json;
using System.Windows.Forms;

namespace Lumen.Workstation.Launcher;

internal static class Program
{
    private const string StartScriptName = "START_LUMEN_WORKSPACE.ps1";

    [STAThread]
    private static int Main(string[] args)
    {
        string root = ResolveRoot(args);

        if (args.Any(static arg => string.Equals(arg, "--self-test", StringComparison.OrdinalIgnoreCase)))
        {
            return SelfTest(root);
        }

        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new LumenWorkstationForm(root));
        return 0;
    }

    private static int SelfTest(string root)
    {
        if (!File.Exists(Path.Combine(root, StartScriptName)))
        {
            return 2;
        }

        return ResolvePwsh() is null ? 3 : 0;
    }

    private static string ResolveRoot(string[] args)
    {
        string? explicitRoot = args.FirstOrDefault(arg => !arg.StartsWith("--", StringComparison.Ordinal));
        if (!string.IsNullOrWhiteSpace(explicitRoot) && Directory.Exists(explicitRoot))
        {
            return Path.GetFullPath(explicitRoot);
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

    internal static string? ResolvePwsh()
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

internal sealed class LumenWorkstationForm : Form
{
    private readonly string _root;
    private readonly string _startScript;
    private readonly TextBox _requestText = new();
    private readonly TextBox _log = new();
    private readonly Label _status = new();
    private readonly Button _startButton = new();
    private readonly Button _saveRequestButton = new();

    public LumenWorkstationForm(string root)
    {
        _root = root;
        _startScript = Path.Combine(_root, "START_LUMEN_WORKSPACE.ps1");

        Text = "Lumen Workstation";
        MinimumSize = new Size(920, 680);
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(248, 250, 252);

        BuildLayout();
        RefreshStatus();
    }

    private void BuildLayout()
    {
        var shell = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 4,
            Padding = new Padding(18)
        };
        shell.RowStyles.Add(new RowStyle(SizeType.Absolute, 72));
        shell.RowStyles.Add(new RowStyle(SizeType.Absolute, 180));
        shell.RowStyles.Add(new RowStyle(SizeType.Absolute, 52));
        shell.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        Controls.Add(shell);

        var header = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 2
        };
        header.RowStyles.Add(new RowStyle(SizeType.Absolute, 36));
        header.RowStyles.Add(new RowStyle(SizeType.Absolute, 28));
        shell.Controls.Add(header, 0, 0);

        header.Controls.Add(new Label
        {
            Text = "Lumen Workstation",
            Dock = DockStyle.Fill,
            Font = new Font("Segoe UI", 20, FontStyle.Bold),
            ForeColor = Color.FromArgb(15, 23, 42)
        }, 0, 0);

        _status.Dock = DockStyle.Fill;
        _status.Font = new Font("Segoe UI", 10, FontStyle.Regular);
        _status.ForeColor = Color.FromArgb(71, 85, 105);
        header.Controls.Add(_status, 0, 1);

        _requestText.Dock = DockStyle.Fill;
        _requestText.Multiline = true;
        _requestText.ScrollBars = ScrollBars.Vertical;
        _requestText.Font = new Font("Segoe UI", 11, FontStyle.Regular);
        _requestText.PlaceholderText = "Tell Lumen what to do. This saves a governed request into the repository inbox so work can continue through Lumen.";
        shell.Controls.Add(_requestText, 0, 1);

        var buttons = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = false
        };
        shell.Controls.Add(buttons, 0, 2);

        _startButton.Text = "Start Workspace";
        _startButton.Width = 142;
        _startButton.Height = 36;
        _startButton.Click += async (_, _) => await StartWorkspaceAsync();
        buttons.Controls.Add(_startButton);

        _saveRequestButton.Text = "Save Request";
        _saveRequestButton.Width = 128;
        _saveRequestButton.Height = 36;
        _saveRequestButton.Click += (_, _) => SaveRequest();
        buttons.Controls.Add(_saveRequestButton);

        buttons.Controls.Add(BuildButton("Open Proofs", () => OpenFolder(Path.Combine(_root, ".lumen", "proof"))));
        buttons.Controls.Add(BuildButton("Open Requests", () => OpenFolder(Path.Combine(_root, ".lumen", "requests"))));
        buttons.Controls.Add(BuildButton("Open Repository", () => OpenFolder(_root)));
        buttons.Controls.Add(BuildButton("Refresh", RefreshStatus));

        _log.Dock = DockStyle.Fill;
        _log.Multiline = true;
        _log.ReadOnly = true;
        _log.ScrollBars = ScrollBars.Vertical;
        _log.Font = new Font("Consolas", 10, FontStyle.Regular);
        _log.BackColor = Color.FromArgb(15, 23, 42);
        _log.ForeColor = Color.FromArgb(226, 232, 240);
        shell.Controls.Add(_log, 0, 3);
    }

    private static Button BuildButton(string text, Action onClick)
    {
        var button = new Button
        {
            Text = text,
            Width = 128,
            Height = 36
        };
        button.Click += (_, _) => onClick();
        return button;
    }

    private async Task StartWorkspaceAsync()
    {
        string? pwsh = Program.ResolvePwsh();
        if (pwsh is null)
        {
            AppendLog("PowerShell 7.6.2 was not found. Install or repair pwsh before starting Lumen.");
            return;
        }

        if (!File.Exists(_startScript))
        {
            AppendLog($"Missing start script: {_startScript}");
            return;
        }

        _startButton.Enabled = false;
        AppendLog("Starting governed Lumen workspace...");

        try
        {
            using var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = pwsh,
                    WorkingDirectory = _root,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true,
                    Arguments = $"-NoProfile -ExecutionPolicy Bypass -File \"{_startScript}\""
                },
                EnableRaisingEvents = true
            };

            process.OutputDataReceived += (_, e) => AppendLog(e.Data);
            process.ErrorDataReceived += (_, e) => AppendLog(e.Data);
            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            await process.WaitForExitAsync();

            AppendLog($"Workspace exited with code {process.ExitCode}.");
            RefreshStatus();
        }
        catch (Exception ex)
        {
            AppendLog(ex.Message);
        }
        finally
        {
            _startButton.Enabled = true;
        }
    }

    private void SaveRequest()
    {
        string request = _requestText.Text.Trim();
        if (request.Length == 0)
        {
            AppendLog("Write a request first.");
            return;
        }

        string requestDir = Path.Combine(_root, ".lumen", "requests");
        Directory.CreateDirectory(requestDir);

        string now = DateTime.Now.ToString("yyyyMMdd_HHmmss");
        string path = Path.Combine(requestDir, $"LUMEN_USER_REQUEST_{now}.json");

        var payload = new
        {
            timestamp = DateTimeOffset.Now.ToString("o"),
            source = "LumenWorkstation.exe",
            mode = "founder-active-windows-11-ui",
            request,
            repositoryRoot = _root,
            founderActiveNow = true,
            userDashboardsEnabled = true,
            specialUserDashboardsEnabled = true,
            governedSelfModificationEnabled = true,
            proofRequired = true
        };

        File.WriteAllText(path, JsonSerializer.Serialize(payload, new JsonSerializerOptions { WriteIndented = true }));
        _requestText.Clear();
        AppendLog($"Saved request: {path}");
        RefreshStatus();
    }

    private void RefreshStatus()
    {
        string sessionPath = Path.Combine(_root, ".lumen", "state", "active-workspace-session.json");
        string requestDir = Path.Combine(_root, ".lumen", "requests");
        int requestCount = Directory.Exists(requestDir) ? Directory.GetFiles(requestDir, "LUMEN_USER_REQUEST_*.json").Length : 0;

        string sessionStatus = File.Exists(sessionPath) ? "session active" : "no session yet";
        string pwshStatus = Program.ResolvePwsh() is null ? "PowerShell 7.6.2 missing" : "PowerShell 7.6.2 ready";
        _status.Text = $"{sessionStatus} | {pwshStatus} | requests: {requestCount} | root: {_root}";
    }

    private void OpenFolder(string path)
    {
        Directory.CreateDirectory(path);
        Process.Start(new ProcessStartInfo
        {
            FileName = path,
            UseShellExecute = true
        });
    }

    private void AppendLog(string? message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            return;
        }

        if (InvokeRequired)
        {
            BeginInvoke(() => AppendLog(message));
            return;
        }

        _log.AppendText($"[{DateTime.Now:HH:mm:ss}] {message}{Environment.NewLine}");
    }
}
