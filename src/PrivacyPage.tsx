import openbotLogo from './assets/openbotlogo.svg'

export default function PrivacyPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Outfit', Arial, sans-serif" }}>
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 cursor-pointer">
            <img src={openbotLogo} alt="OpenBot" className="w-6 h-6" />
            <span className="text-base font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>OpenBot</span>
          </button>
          <button onClick={onBack} className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
            ← Back to home
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-zinc-600 uppercase mb-4">Legal</p>
        <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: April 25, 2026</p>

        <div className="flex flex-col gap-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Overview</h2>
            <p>OpenBot is built local-first. Your data, API keys, agent configurations, and task history live on your device. We do not operate servers that store your personal information or your prompts. This policy describes the limited ways in which information may be collected or shared.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Information We Do Not Collect</h2>
            <p className="mb-3">Because OpenBot runs locally on your machine, we do not collect or have access to:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-zinc-400">
              <li>Your prompts, tasks, or agent workflows</li>
              <li>Your API keys for OpenAI, Anthropic, Google, or any other provider</li>
              <li>Files you process through OpenBot</li>
              <li>Your conversation or memory data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Information We May Collect</h2>
            <p className="mb-3">When you interact with our website (getopenbot.com) or community channels, we may collect:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-zinc-400">
              <li><span className="text-zinc-300">Usage analytics</span> — anonymized page views and interactions to help us understand what's working (e.g. via privacy-respecting analytics tools).</li>
              <li><span className="text-zinc-300">Email address</span> — only if you voluntarily sign up for updates or contact us directly.</li>
              <li><span className="text-zinc-300">GitHub data</span> — stars, issues, and pull requests are public and governed by GitHub's privacy policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party AI Providers</h2>
            <p>When you use OpenBot to run tasks, your prompts are sent directly from your device to the AI provider you have configured (e.g. OpenAI, Anthropic, Google Gemini). OpenBot does not proxy or log these requests. Each provider's own privacy policy governs how they handle your data. We recommend reviewing them:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-2 text-zinc-400">
              <li><a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">OpenAI Privacy Policy</a></li>
              <li><a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">Anthropic Privacy Policy</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">Google Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Integrations and External Services</h2>
            <p>OpenBot can connect to external services (Slack, GitHub, Telegram, etc.) using credentials you provide. These credentials are stored locally. When OpenBot executes actions on these services, it does so on your behalf and subject to their respective terms and privacy policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Data Security</h2>
            <p>Since all sensitive data (API keys, memory, task history) is stored locally on your device, its security depends on your device's security. We recommend using system-level encryption and keeping your machine secure. We do not have the ability to access, recover, or delete your local data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>OpenBot is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will post updates on this page with a revised date. Your continued use of OpenBot after any changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>For privacy-related questions or concerns, please open an issue on our <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">GitHub repository</a> or reach out on <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">Discord</a>.</p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
