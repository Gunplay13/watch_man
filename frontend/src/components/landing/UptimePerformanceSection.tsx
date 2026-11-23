import React from 'react';

export default function UptimePerformanceSection(): React.JSX.Element {
  return (
    <div className="w-full">
      {/* Narrative Section 1: Outage Detection */}
      <section id="uptime" className="w-full border-b border-dashed border-wm-border bg-wm-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Copy (Left) */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text leading-tight">
                  Get alerted the moment your site goes down
                </h2>
                <p className="text-sm font-normal text-wm-muted leading-relaxed">
                  Catch problems before your customers do. Continuously check if your website is working correctly and get notified of outages.
                </p>

                <div className="space-y-5 pt-2">
                  <div>
                    <h3 className="text-sm font-semibold text-wm-text">Check your website status every minute</h3>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Find out about downtime as quickly as possible and fix issues before they impact your business.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-wm-text">Easy setup</h3>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Add a URL, pick how often to check it, and set up notification channels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Visual (Right) */}
              <div className="lg:col-span-6">
                <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
                  <img
                    src="/section-uptime-chart.jpg"
                    alt="Uptime monitoring chart showing uptime percentage and response time"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Response Time & Latency Tracking */}
      <section id="performance" className="w-full border-b border-dashed border-wm-border bg-wm-surface/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Section Visual (Left on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
                  <img
                    src="/section-response-breakdown.jpg"
                    alt="Response time breakdown chart showing DNS, TCP, SSL, and request duration"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Copy (Right on lg) */}
              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text leading-tight">
                  Monitor response time
                </h2>
                <h3 className="text-base font-medium text-wm-text">
                  Keep your website fast
                </h3>
                <p className="text-sm font-normal text-wm-muted leading-relaxed">
                  Watchman doesn&apos;t just check that your website is loading correctly, but also keeps track of how fast your server responds.
                </p>

                <div className="space-y-5 pt-2">
                  <div>
                    <h4 className="text-sm font-semibold text-wm-text">Trigger alerts for slow responses</h4>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Even if your website is technically working, customers may still run into issues with a slow site. Configure custom alert criteria and fail checks if responses are too slow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
