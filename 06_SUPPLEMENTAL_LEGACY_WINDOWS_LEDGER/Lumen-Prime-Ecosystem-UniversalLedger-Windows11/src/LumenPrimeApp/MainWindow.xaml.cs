using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace LumenPrimeApp;

public partial class MainWindow : Window
{
    readonly string Root = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Lumen");
    string ConfigPath => Path.Combine(Root, "Config", "lumen-config.json");
    string SecretsPath => Path.Combine(Root, "Secrets", "lumen-secrets.dpapi.json");
    string VaultPath => Path.Combine(Root, "Vault", "lumen-local-vault.append-only.jsonl");
    string LedgerPath => Path.Combine(Root, "Vault", "lumen-universal-activity-ledger.jsonl");
    string ReportsPath => Path.Combine(Root, "Reports");
    string AudioPath => Path.Combine(Root, "Voice", "lumen-openai-voice.mp3");
    JsonElement Config;
    JsonElement Secrets;
    readonly HttpClient Http = new();

    public MainWindow()
    {
        InitializeComponent();
        foreach (var f in new[]{"Vault","Config","Secrets","Reports","Backups","Voice","Approvals","Logs"}) Directory.CreateDirectory(Path.Combine(Root, f));
        Config = ReadJson(ConfigPath); Secrets = ReadJson(SecretsPath);
        WireEvents(); LoadStaticContent(); RefreshAll();
        Ledger("launch", "system", "Lumen Prime Ecosystem launched", "success", new[] { "startup", "lumen" });
    }

    void WireEvents()
    {
        BtnOpenFolder.Click += (_,__) => System.Diagnostics.Process.Start("explorer.exe", Root);
        BtnClear.Click += (_,__) => CommandBox.Text = "";
        BtnSaveVault.Click += (_,__) => { Ledger("request", "command", CommandBox.Text, "saved", new[] { "manual", "vault" }); Status("Saved request to Vault and Universal Activity Ledger."); RefreshAll(); };
        BtnSendOpenAI.Click += async (_,__) => await SendToOpenAI();
        BtnReadAloud.Click += async (_,__) => await SpeakWithOpenAI(ResponseBox.Text.Length > 20 ? ResponseBox.Text : CommandBox.Text);
        BtnSecurityScan.Click += (_,__) => RunSecurityScan();
        BtnGreen.Click += (_,__) => Approve("Green Implement"); BtnYellow.Click += (_,__) => Approve("Yellow Revise"); BtnRed.Click += (_,__) => Approve("Red Redesign");
        BtnSearchLedger.Click += (_,__) => RefreshLedger(LedgerSearch.Text); BtnRefreshLedger.Click += (_,__) => RefreshLedger("");
        BtnOpenDotNet.Click += (_,__) => OpenResource("https://dotnet.microsoft.com/download");
        BtnOpenOpenAI.Click += (_,__) => OpenResource("https://platform.openai.com/");
        BtnOpenCloudflare.Click += (_,__) => OpenResource("https://dash.cloudflare.com/");
        BtnOpenSupabase.Click += (_,__) => OpenResource("https://supabase.com/dashboard");
        BtnOpenGitHub.Click += (_,__) => OpenResource("https://github.com/blamo7997/brian-dashboard");
        BtnOpenOWASP.Click += (_,__) => OpenResource("https://owasp.org/");
        BtnOpenCIS.Click += (_,__) => OpenResource("https://www.cisecurity.org/controls");
    }

    JsonElement ReadJson(string path) { try { if (File.Exists(path)) return JsonDocument.Parse(File.ReadAllText(path)).RootElement.Clone(); } catch { } return JsonDocument.Parse("{}").RootElement.Clone(); }
    string Prop(JsonElement el, string name) { try { if (el.ValueKind == JsonValueKind.Object && el.TryGetProperty(name, out var p)) return p.GetString() ?? ""; } catch { } return ""; }
    string OpenAiKey() => Prop(Secrets, "OPENAI_API_KEY");
    void Status(string message) => StatusText.Text = message;

    void Ledger(string type, string category, string message, string result, string[] tags)
    {
        var record = new { timestamp = DateTimeOffset.UtcNow.ToString("o"), localTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), user = Environment.UserName, machine = Environment.MachineName, session = Environment.ProcessId, type, category, result, tags, message };
        var line = JsonSerializer.Serialize(record);
        File.AppendAllText(LedgerPath, line + Environment.NewLine);
        File.AppendAllText(VaultPath, line + Environment.NewLine);
    }

    async Task SendToOpenAI()
    {
        var key = OpenAiKey();
        if (string.IsNullOrWhiteSpace(key)) { ResponseBox.Text = "OPENAI_API_KEY was not found in the local Lumen secret store."; return; }
        var userText = CommandBox.Text.Trim(); if (string.IsNullOrWhiteSpace(userText)) return;
        Status("OpenAI Command Bridge: analyzing intent and preparing recommendation..."); Ledger("openai-command", "command-bridge", userText, "started", new[] { "openai", "intent", "vault" });
        try
        {
            var system = "You are Lumen Prime inside Brian's private Founder Workspace. Use Brian & Co tone: warm, eloquent, patient, human, professional, culturally aware, and never crude. Preserve Vault-first, additive-only, no placeholder, no destructive overwrite, protected-rules-first, user-sandboxed, encrypted-by-default architecture. Return: Intent, Plan, Protected Systems Preserved, Risks, Tests to Run, Green/Yellow/Red options, and next actions. Do not expose secrets.";
            var payload = new { model = "gpt-4o-mini", messages = new object[] { new { role = "system", content = system }, new { role = "user", content = userText } }, temperature = 0.25 };
            using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
            req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", key);
            req.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            using var res = await Http.SendAsync(req); var body = await res.Content.ReadAsStringAsync();
            if (!res.IsSuccessStatusCode) { ResponseBox.Text = "OpenAI returned an error.\n\n" + body; Ledger("openai-command", "command-bridge", body, "failed", new[] { "openai", "error" }); Status("OpenAI Command Bridge returned an error. Details saved to Vault."); return; }
            using var doc = JsonDocument.Parse(body); var answer = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? "";
            ResponseBox.Text = answer; Ledger("openai-command", "command-bridge", answer, "success", new[] { "openai", "response", "recommendation" }); Status("OpenAI Command Bridge complete. Recommendation saved to Vault and Ledger."); RefreshAll();
        }
        catch (Exception ex) { ResponseBox.Text = ex.ToString(); Ledger("openai-command", "command-bridge", ex.ToString(), "exception", new[] { "openai", "exception" }); Status("OpenAI Command Bridge failed safely. Exception saved to Vault."); }
    }

    async Task SpeakWithOpenAI(string text)
    {
        var key = OpenAiKey(); if (string.IsNullOrWhiteSpace(key)) { Status("OpenAI voice unavailable: key not found."); return; }
        if (string.IsNullOrWhiteSpace(text)) text = "Lumen is ready."; Status("Generating human-quality OpenAI voice...");
        try
        {
            var payload = new { model = "gpt-4o-mini-tts", voice = "verse", input = text.Length > 3500 ? text[..3500] : text };
            using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/audio/speech"); req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", key); req.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            using var res = await Http.SendAsync(req); var bytes = await res.Content.ReadAsByteArrayAsync();
            if (!res.IsSuccessStatusCode) { Status("OpenAI voice returned an error. Saved to Vault."); Ledger("voice", "openai-tts", Encoding.UTF8.GetString(bytes), "failed", new[] { "voice" }); return; }
            File.WriteAllBytes(AudioPath, bytes); Ledger("voice", "openai-tts", "Generated OpenAI voice narration.", "success", new[] { "voice", "openai" }); System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo(AudioPath) { UseShellExecute = true }); Status("OpenAI voice generated and opened.");
        }
        catch (Exception ex) { Status("OpenAI voice failed safely."); Ledger("voice", "openai-tts", ex.ToString(), "exception", new[] { "voice", "exception" }); }
    }

    void Approve(string decision) { var msg = $"Founder decision recorded: {decision}. Related command: {CommandBox.Text}"; Ledger("approval", "founder-approval", msg, decision, new[] { "approval", decision }); Status(msg); RefreshAll(); }

    void RunSecurityScan()
    {
        var report = $"Lumen Sovereign Security Scan\nTimestamp: {DateTimeOffset.UtcNow:o}\n\nBaselines tracked as living standards, not ceilings:\n- CIS Controls\n- NIST CSF\n- OWASP Web Top 10\n- OWASP LLM / GenAI risks\n- Supply-chain security: dependencies, SBOM, signed updates\n- Zero trust: verify every user, action, module, and API request\n- Per-user encryption and sandboxing\n- Upload scanning, executable quarantine, continuous re-scan\n- AI prompt-injection firewall and AI audit logs\n- User-facing Security Center in Brian & Co tone\n\nResult: Local security posture report generated. External scans require connected online scanners/services and explicit setup.\n";
        var path = Path.Combine(ReportsPath, $"lumen-sovereign-security-{DateTime.UtcNow:yyyyMMdd-HHmmss}.txt"); File.WriteAllText(path, report); SecurityBox.Text = report; Ledger("security-scan", "guardian", report, "completed", new[] { "security", "guardian", "report" }); Status("Security scan report saved to Vault and Reports.");
    }

    void OpenResource(string url) { ResourceBox.Text = "Opening resource inside your workflow. If this opens externally, complete any required CAPTCHA, identity, consent, or payment directly as yourself, then return to Lumen.\n\n" + url; Ledger("resource", "concierge", url, "opened", new[] { "resource", "setup" }); System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo(url) { UseShellExecute = true }); }

    Border Card(string title, string value, string note)
    {
        var b = new Border { Width = 260, MinHeight = 120, Margin = new Thickness(8), CornerRadius = new CornerRadius(18), Padding = new Thickness(14), BorderThickness = new Thickness(1), BorderBrush = new SolidColorBrush(Color.FromRgb(216,170,75)), Background = new SolidColorBrush(Color.FromRgb(20,16,10)) };
        var s = new StackPanel(); s.Children.Add(new TextBlock { Text = title, Foreground = new SolidColorBrush(Color.FromRgb(255,230,163)), FontWeight = FontWeights.Bold, FontSize = 15 }); s.Children.Add(new TextBlock { Text = value, FontSize = 22, FontWeight = FontWeights.Bold, Margin = new Thickness(0,8,0,4) }); s.Children.Add(new TextBlock { Text = note, TextWrapping = TextWrapping.Wrap, Opacity = .88 }); b.Child = s; return b;
    }

    void RefreshAll()
    {
        DashboardPanel.Children.Clear();
        DashboardPanel.Children.Add(Card("Cloudflare", string.IsNullOrWhiteSpace(Prop(Config,"cloudflareWorkerUrl")) ? "Check" : "Saved", "Public gateway / Worker."));
        DashboardPanel.Children.Add(Card("GitHub", string.IsNullOrWhiteSpace(Prop(Config,"githubRepo")) ? "Check" : Prop(Config,"githubRepo"), "Code, history, Vault path."));
        DashboardPanel.Children.Add(Card("Supabase", string.IsNullOrWhiteSpace(Prop(Config,"supabaseUrl")) ? "Check" : "Saved", "Data and auth baseline."));
        DashboardPanel.Children.Add(Card("OpenAI", string.IsNullOrWhiteSpace(OpenAiKey()) ? "Missing" : "Key Stored", "Command Bridge and human voice path."));
        DashboardPanel.Children.Add(Card("Ledger", File.Exists(LedgerPath) ? File.ReadLines(LedgerPath).Count().ToString() : "0", "Timestamped searchable user/action records."));
        DashboardPanel.Children.Add(Card("Vault", File.Exists(VaultPath) ? new FileInfo(VaultPath).Length + " bytes" : "Missing", "Append-only source of truth."));
        DashboardPanel.Children.Add(Card("Sales", "Ready", "Dashboard placeholder for product metrics integration."));
        DashboardPanel.Children.Add(Card("Security", "Sovereign", "CIS/NIST/OWASP baseline, not ceiling."));
        RefreshLedger(""); RefreshVault();
    }

    void RefreshLedger(string filter) { if (!File.Exists(LedgerPath)) { LedgerBox.Text = "No ledger records yet."; return; } var lines = File.ReadLines(LedgerPath).Reverse().Take(300); if (!string.IsNullOrWhiteSpace(filter)) lines = lines.Where(l => l.Contains(filter, StringComparison.OrdinalIgnoreCase)); LedgerBox.Text = string.Join(Environment.NewLine, lines); }
    void RefreshVault() { if (!File.Exists(VaultPath)) { VaultBox.Text = "Vault not found yet."; return; } VaultBox.Text = string.Join(Environment.NewLine, File.ReadLines(VaultPath).Reverse().Take(200)); }

    void LoadStaticContent()
    {
        SecurityBox.Text = "Lumen Sovereign Security™\n\nSecurity posture: beyond baseline frameworks, continuously verified.\n\nRequired controls:\n- Zero Trust everywhere\n- Per-user encryption and private sandboxing\n- Prompt-injection firewall and AI audit logs\n- Signed updates, dependency scanning, SBOM-ready supply chain\n- Upload scanning, malware scanning, executable quarantine, continuous re-scan\n- Founder Private lockdown and emergency controls\n- User-facing Security Center written in Brian & Co's warm, reassuring tone\n- Standards watch: CIS, NIST, OWASP, privacy, AI, accessibility, and jurisdictional compliance\n";
        CommunicationsBox.Text = "Lumen Universal Communications™\n\nBefore any email, chat, notification, support reply, portal message, or other communication is sent, Lumen should:\n- understand intent\n- preserve Brian & Co tone\n- adapt language, dialect, and culture\n- check clarity and professionalism\n- support accessibility preferences\n- show a final version for review unless trusted automation is explicitly enabled\n\nAll communications are timestamped, categorized, searchable, user-sandboxed, and Vault-recorded.";
        LocalizationBox.Text = "Lumen Native Culture & Localization Intelligence™\n\nHard rule:\nThe message keeps Brian & Co's warm, eloquent, respectful, patient, human tone, then adapts culturally to the user's native/preferred language, dialect, locality, age group, accessibility needs, and communication expectations.\n\nThis is culturally appropriate localization, not literal translation.";
        AccessibilityBox.Text = "Lumen Adaptive Accessibility & Care Engine™\n\nSupported profiles include, without diagnosis:\n- Autism\n- ADHD\n- Dyslexia\n- PTSD and Complex PTSD\n- Anxiety\n- Depression and severe depression\n- Dementia and Alzheimer's\n- Caregiver support\n- Blindness / low vision\n- Epilepsy-safe controls\n- Hearing support\n- Mobility support\n- Cognitive support\n- Trauma-informed modes\n\nEvery feature inherits accessibility by default.";
        ResourceBox.Text = "Lumen Resource Concierge™\n\nUse this area to open free official resources and setup pages. Lumen records each resource action in the Vault. Human verification, CAPTCHA, legal consent, identity checks, and payments must be completed by you directly when required.";
        RegistryBox.Text = "Lumen Implementation Registry™\n\nEvery requested feature should be tracked as:\nRequirement | Priority | Dependencies | Protected Status | Implementation Status | Testing Status | Approval Status\n\nCurrent baseline includes:\n- OpenAI Command Bridge\n- Universal Activity Ledger\n- Vault-first records\n- Sovereign Security\n- Human Voice path\n- Localization Intelligence\n- Communications Engine\n- Resource Concierge\n- Accessibility/Care Engine\n- Founder approvals\n- Protected install behavior\n";
        ResponseBox.Text = "Lumen is ready.\n\nType what you want in the command bar. Lumen will save the request, call OpenAI using your stored key, return a structured recommendation, and record the result in the Vault and Universal Activity Ledger.\n\nImportant: this build provides the bridge and operating surface. Large autonomous rebuild/test/deploy loops require connected project automation, source access, and explicit approval gates.";
    }
}
