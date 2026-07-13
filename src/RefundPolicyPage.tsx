import openbotLogo from './assets/openbotlogo.svg'

export default function RefundPolicyPage({ onBack }: { onBack: () => void }) {
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
        <h1 className="text-4xl font-bold mb-3">Refund Policy</h1>
        <p className="text-muted-foreground text-sm mb-12">Last updated: July 13, 2026</p>

        <div className="flex flex-col gap-10 text-foreground/90 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Overview</h2>
            <p>OpenBot offers two versions: a free self-hosted version and a paid Cloud version (currently in early access). This policy describes the refund terms for OpenBot Cloud. The self-hosted version is free and requires no payment, so refunds do not apply to it.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Self-Hosted (Free)</h2>
            <p>The self-hosted OpenBot platform is provided free of charge under an open-source MIT license. There are no fees associated with downloading or using it, and no refunds are applicable.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. OpenBot Cloud — Early Access</h2>
            <p>OpenBot Cloud is currently in early access. No charges are applied during early access unless you have been explicitly notified otherwise. You will receive advance notice before any billing begins, and you may opt out at any time before charges take effect.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Cloud Subscription Refunds</h2>
            <p className="mb-3">When Cloud billing becomes active, the following refund terms apply:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
              <li>Refund requests must be submitted within <strong className="text-foreground/90">30 days</strong> of the charge date</li>
              <li>Approved refunds are processed to the original payment method within 7–10 business days</li>
              <li>To request a refund, contact us via <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">Discord</a> or our <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">GitHub repository</a></li>
              <li>We reserve the right to deny refunds in cases of abuse or violation of our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Third-Party API Charges</h2>
            <p>OpenBot is a "Bring Your Own Key" (BYOK) platform. You are responsible for all charges incurred from third-party AI providers (OpenAI, Anthropic, Google, etc.). We are not responsible for any fees charged by these third-party services. Refunds for third-party API usage must be requested directly from those providers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Cancellation</h2>
            <p>You may cancel your Cloud subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. You will retain access to Cloud features until the period ends; no partial refunds are issued for unused time unless requested within the 30-day window above.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Changes to Policy</h2>
            <p>We may update this Refund Policy from time to time. We will post the revised policy on this page with an updated date. Continued use of the platform after changes constitutes acceptance of the new policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact</h2>
            <p>For questions about this Refund Policy or to request a refund, please reach out on <a href="https://discord.gg/XYYXvN2ebB" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">Discord</a> or open an issue on our <a href="https://github.com/meetopenbot/openbot" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-foreground/90 transition-colors">GitHub repository</a>.</p>
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
            <button onClick={() => { window.history.pushState({}, '', '/terms'); window.dispatchEvent(new PopStateEvent('popstate')) }} className="text-subtle-foreground hover:text-muted-foreground text-xs transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
