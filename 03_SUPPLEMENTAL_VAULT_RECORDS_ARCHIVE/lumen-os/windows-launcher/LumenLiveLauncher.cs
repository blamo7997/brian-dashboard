using System;
using System.Diagnostics;
using System.Windows.Forms;

public class LumenLiveLauncher : Form
{
    public LumenLiveLauncher()
    {
        Text = "Lumen OS — Live Complete Setup";
        Width = 760;
        Height = 410;
        StartPosition = FormStartPosition.CenterScreen;

        AddButton("Visual Live Setup", 24, 40, "visual");
        AddButton("Launch Lumen", 24, 90, "start");
        AddButton("Enter Keys Locally", 24, 140, "keys");
        AddButton("Recovery", 24, 190, "recovery");
        AddButton("Dependencies", 24, 240, "deps");
        AddButton("Uninstall Launchers", 24, 290, "uninstall");
    }

    private void AddButton(string text, int left, int top, string action)
    {
        Button b = new Button();
        b.Text = text;
        b.Left = left;
        b.Top = top;
        b.Width = 290;
        b.Height = 34;
        b.Click += (s,e) => Run(action);
        Controls.Add(b);
    }

    private void PS(string script)
    {
        Process.Start(new ProcessStartInfo {
            FileName = "powershell.exe",
            Arguments = "-ExecutionPolicy Bypass -File \"" + script + "\"",
            UseShellExecute = true
        });
    }

    private void Run(string action)
    {
        string root = "C:\\Users\\user\\brianco-backend-clean";

        if(action == "visual") PS(root + "\\lumen-os\\windows-launcher\\Lumen-Live-Complete-Setup.ps1");
        else if(action == "keys") PS(root + "\\lumen-os\\windows-launcher\\Lumen-Enter-Keys-Locally.ps1");
        else if(action == "recovery") PS(root + "\\lumen-os\\windows-launcher\\Lumen-Full-Merged-Recovery-Menu.ps1");
        else if(action == "deps") PS(root + "\\lumen-os\\setup\\Install-Lumen-Live-Dependencies.ps1");
        else if(action == "uninstall") PS(root + "\\lumen-os\\windows-launcher\\Uninstall-Lumen-Workspace.ps1");
        else if(action == "start")
        {
            Process.Start(new ProcessStartInfo {
                FileName = "powershell.exe",
                Arguments = "-NoExit -ExecutionPolicy Bypass -Command \"Set-Location '" + root + "'; npm run dev\"",
                UseShellExecute = true
            });
            System.Threading.Thread.Sleep(6000);
            Process.Start("http://localhost:3000/lumen/control");
        }
    }

    [STAThread]
    public static void Main()
    {
        Application.EnableVisualStyles();
        Application.Run(new LumenLiveLauncher());
    }
}
