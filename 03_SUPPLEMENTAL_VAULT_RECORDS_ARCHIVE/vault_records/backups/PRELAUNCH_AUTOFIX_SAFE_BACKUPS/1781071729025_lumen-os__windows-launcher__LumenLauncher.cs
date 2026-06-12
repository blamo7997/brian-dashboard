using System;
using System.Diagnostics;

class Program
{
    static void Main()
    {
        var psi = new ProcessStartInfo();
        psi.FileName = "powershell.exe";
        psi.Arguments = "-ExecutionPolicy Bypass -File \"C:\\Users\\user\\brianco-backend-clean\\lumen-os\\windows-launcher\\Start-Lumen.ps1\"";
        psi.UseShellExecute = true;
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        Process.Start(psi);
    }
}
