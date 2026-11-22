import React from 'react';

const PARTNERS = [
  'PAYPAL',
  'SIEMENS',
  'ZEISS',
  'MEDIBANK',
  'MONERIS',
  'PAYSTACK',
  'FLUTTERWAVE',
];

export default function TrustedBySection(): React.JSX.Element {
  return (
    <section className="w-full border-b border-dashed border-wm-border bg-wm-surface/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="border-x border-dashed border-wm-border py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-wm-muted whitespace-nowrap">
            Trusted by teams at
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="text-xs font-bold tracking-widest text-wm-muted hover:text-wm-text transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}