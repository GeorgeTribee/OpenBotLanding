import openbotLogo from './assets/openbotlogo.svg'

export default function TermsPage({ onBack }: { onBack: () => void }) {
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
        <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: April 25, 2026</p>

        <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By downloading, installing, or using OpenBot ("the Software" or "the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Software or Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Description of Service</h2>
            <p className="mb-3">OpenBot is an AI agent orchestration platform available in two forms:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
              <li><span className="text-foreground/90">Self-hosted:</span> open-source software that runs locally on your machine, communicating with third-party AI providers using API keys you supply.</li>
              <li><span className="text-foreground/90">Cloud (early access):</span> a managed, hosted version operated by OpenBot. Access requires account registration. The Cloud version is currently in early access and pricing will be announced before general availability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Permitted Use</h2>
            <p className="mb-3">You may use OpenBot for personal, commercial, and research purposes. You are responsible for all activity that occurs through your installation or account.</p>
            <p>You agree not to use OpenBot to:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-2 text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Harass, harm, or threaten any person</li>
              <li>Distribute malware, spam, or malicious content</li>
              <li>Circumvent the terms of any third-party service you access through OpenBot</li>
              <li>Attempt to reverse-engineer or resell the Software in violation of the applicable license</li>
              <li>Abuse or overload the Cloud infrastructure in a way that degrades service for other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. API Keys and Third-Party Services</h2>
            <p>OpenBot is a "Bring Your Own Key" (BYOK) platform. In the self-hosted version, API keys are stored locally on your device and never transmitted to our servers. In the Cloud version, API keys are stored encrypted on our servers to enable the managed service. You are solely responsible for the usage and security of your API keys and for complying with each provider's terms of service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cloud Subscriptions and Billing</h2>
            <p className="mb-3">When Cloud pricing is announced, the following terms will apply to paid subscriptions:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
              <li>Subscriptions are billed in advance on a monthly or annual basis.</li>
              <li>You authorize us to charge the payment method on file at the start of each billing period.</li>
              <li>Failure to pay may result in suspension or termination of your Cloud account.</li>
              <li>Refunds are governed by our <button onClick={() => { window.history.pushState({}, '', '/refund-policy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-foreground underline hover:text-foreground/90 transition-colors cursor-pointer">Refund Policy</button>.</li>
            </ul>
            <p className="mt-3 text-muted-foreground text-sm">Early access users will be given advance notice before any billing begins.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Intellectual Property</h2>
            <p>The OpenBot name, logo, and associated marks are the property of the OpenBot team. The Software's source code is made available under the terms of its applicable open-source license. Nothing in these Terms grants you a right to use our trademarks.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Disclaimer of Warranties</h2>
            <p>The Software and Service are provided "as is" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Software or Service will be error-free or uninterrupted.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, OpenBot and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Software or Service, even if advised of the possibility of such damages.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We will post the revised Terms on this page with an updated date. Continued use of the Software or Service after changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact</h2>
            <p>For questions about these Terms, please open an issue on our <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">GitHub repository</a> or reach out on <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">Discord</a>.</p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-subtle-foreground text-xs">© {new Date().getFullYear()} OpenBot. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Home</button>
            <button onClick={() => { window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
