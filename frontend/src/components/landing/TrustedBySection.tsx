import React from 'react';

const PARTNERS = [
  { name: 'PAYPAL', desc: 'Global Payments' },
  { name: 'SIEMENS', desc: 'Industrial IoT' },
  { name: 'ZEISS', desc: 'Precision Optics' },
  { name: 'MEDIBANK', desc: 'Healthcare Services' },
  { name: 'MONERIS', desc: 'Transaction Processing' },
  { name: 'PAYSTACK', desc: 'Fintech Infrastructure' },
  { name: 'FLUTTERWAVE', desc: 'Pan-African Gateway' },
];

export default function TrustedBySection(): React.JSX.Element {
  return (
    <section className="w-full border-y border-wm-border bg-wm-surface py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs font-bold uppercase tracking-wider text-wm-muted whitespace-nowrap">
          Trusted by teams at
        </div>

        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-1.5 text-xs md:text-sm font-extrabold tracking-widest text-wm-muted hover:text-wm-text transition-colors cursor-default"
              title={`${p.name} — ${p.desc}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-wm-accent" />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
