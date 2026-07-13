import openbotLogo from './assets/openbotlogo.svg'

export default function PrivacyPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-6 h-6" />
            <span className="text-base font-medium">OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            ← Back to home
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-subtle-foreground uppercase mb-4">Legal</p>
        <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: April 25, 2026</p>

        <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Overview</h2>
            <p className="mb-3">OpenBot is available in two versions with different privacy characteristics:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground mb-3">
              <li><span className="text-foreground/90">Self-hosted:</span> runs entirely on your machine. Your data, API keys, agent configurations, and task history stay on your device. We have no access to them.</li>
              <li><span className="text-foreground/90">Cloud (early access):</span> a managed, hosted version of OpenBot. Task data and configurations are stored on our servers to enable the service. The sections below clarify which applies in each case.</li>
            </ul>
            <p>This policy describes how information may be collected or shared across both versions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Self-Hosted: Information We Do Not Collect</h2>
            <p className="mb-3">Because the self-hosted version runs locally on your machine, we do not collect or have access to:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
              <li>Your prompts, tasks, or agent workflows</li>
              <li>Your API keys for OpenAI, Anthropic, Google, or any other provider</li>
              <li>Files you process through OpenBot</li>
              <li>Your conversation or memory data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Cloud: Information We Collect and Store</h2>
            <p className="mb-3">When you use OpenBot Cloud, we collect and process the following to provide the service:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
              <li><span className="text-foreground/90">Account information</span> — email address, name, and authentication credentials needed to create and manage your account.</li>
              <li><span className="text-foreground/90">Agent configurations</span> — workspace settings and agent setups stored server-side to enable cross-device access.</li>
              <li><span className="text-foreground/90">Task and workflow data</span> — prompts, task history, and results processed through the cloud service. This data is used solely to deliver and improve the service.</li>
              <li><span className="text-foreground/90">Usage telemetry</span> — anonymized usage patterns to help us improve performance and reliability.</li>
            </ul>
            <p className="mt-3 text-muted-foreground text-sm">We do not sell your data to third parties. Cloud data is encrypted in transit and at rest.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Website and Community</h2>
            <p className="mb-3">When you interact with our website (getopenbot.com) or community channels, we may collect:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
              <li><span className="text-foreground/90">Usage analytics</span> — anonymized page views and interactions to help us understand what's working.</li>
              <li><span className="text-foreground/90">Email address</span> — only if you voluntarily sign up for updates, join the waitlist, or contact us directly.</li>
              <li><span className="text-foreground/90">GitHub data</span> — stars, issues, and pull requests are public and governed by GitHub's privacy policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Third-Party AI Providers</h2>
            <p>When you use OpenBot to run tasks, your prompts are sent to the AI provider you have configured (e.g. OpenAI, Anthropic, Google Gemini). In the self-hosted version, requests go directly from your device; in Cloud, they are routed through our infrastructure. In both cases, each provider's own privacy policy governs how they handle your data. We recommend reviewing them:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-2 text-muted-foreground">
              <li><a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">OpenAI Privacy Policy</a></li>
              <li><a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">Anthropic Privacy Policy</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">Google Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Integrations and External Services</h2>
            <p>OpenBot can connect to external services (Slack, GitHub, Telegram, etc.) using credentials you provide. In the self-hosted version, credentials are stored locally. In Cloud, credentials are stored encrypted on our servers. When OpenBot executes actions on these services, it does so on your behalf and subject to their respective terms and privacy policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Data Security</h2>
            <p>For self-hosted: since all sensitive data is stored on your device, its security depends on your device's security. We recommend system-level encryption. For Cloud: we apply industry-standard encryption in transit (TLS) and at rest, access controls, and regular security reviews. We do not access your task data except as needed to operate and support the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Children's Privacy</h2>
            <p>OpenBot is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will post updates on this page with a revised date. Your continued use of OpenBot after any changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact</h2>
            <p>For privacy-related questions or concerns, please open an issue on our <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">GitHub repository</a> or reach out on <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">Discord</a>.</p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-subtle-foreground text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
