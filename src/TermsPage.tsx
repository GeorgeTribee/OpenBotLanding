import openbotLogo from './assets/openbotlogo.svg'

export default function TermsPage({ onBack }: { onBack: () => void }) {
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
        <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: April 25, 2026</p>

        <div className="flex flex-col gap-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By downloading, installing, or using OpenBot ("the Software"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Software.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
            <p>OpenBot is a local-first AI agent platform that orchestrates tasks across multiple AI models and services. The Software runs on your machine and communicates with third-party AI providers (such as OpenAI, Anthropic, and Google) using API keys you supply.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Permitted Use</h2>
            <p className="mb-3">You may use OpenBot for personal, commercial, and research purposes. You are responsible for all activity that occurs through your installation of the Software.</p>
            <p>You agree not to use OpenBot to:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-2 text-zinc-400">
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, harm, or threaten any person</li>
              <li>Distribute malware, spam, or malicious content</li>
              <li>Circumvent the terms of any third-party service you access through the Software</li>
              <li>Attempt to reverse-engineer or resell the Software in violation of the applicable license</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. API Keys and Third-Party Services</h2>
            <p>OpenBot requires API keys from third-party AI providers. These keys are stored locally on your device. OpenBot does not transmit your API keys to our servers. You are solely responsible for the usage and security of your API keys and for complying with each provider's terms of service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>The OpenBot name, logo, and associated marks are the property of the OpenBot team. The Software's source code is made available under the terms of its applicable open-source license. Nothing in these Terms grants you a right to use our trademarks.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>The Software is provided "as is" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Software will be error-free or uninterrupted.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, OpenBot and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Software, even if advised of the possibility of such damages.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We will post the revised Terms on this page with an updated date. Continued use of the Software after changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contact</h2>
            <p>For questions about these Terms, please open an issue on our <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">GitHub repository</a> or reach out on <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">Discord</a>.</p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => { window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors cursor-pointer">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
