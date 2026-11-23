import React from 'react';

export default function DiagnosticsValidationSection(): React.JSX.Element {
  return (
    <div className="w-full">
      {/* Narrative Section 3: Advanced Check Options */}
      <section id="validation" className="w-full border-b border-dashed border-wm-border bg-wm-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Copy (Left) */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text leading-tight">
                  Advanced check options
                </h2>

                <div className="space-y-5 pt-2">
                  <div>
                    <h3 className="text-sm font-semibold text-wm-text">Validate response details</h3>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Check that HTTP status codes, response headers, and response body content match what you&apos;re expecting.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-wm-text">Reduce false alarms</h3>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Confirm failures from a second region and only alert after several consecutive failures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Visual (Right) */}
              <div className="lg:col-span-6">
                <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
                  <img
                    src="/section-advanced-checks.jpg"
                    alt="Advanced check options and validation configuration modal"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 4: Incident Diagnostics & Preserved Traces */}
      <section id="diagnostics" className="w-full border-b border-dashed border-wm-border bg-wm-surface/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-x border-dashed border-wm-border py-14 md:py-16 px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Section Visual (Left on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-lg border border-wm-border bg-wm-surface overflow-hidden">
                  <img
                    src="/section-failure-diagnostics.jpg"
                    alt="Failure details showing response headers and body behind the failure"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Copy (Right on lg) */}
              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-wm-text leading-tight">
                  Find out why a check failed
                </h2>
                <h3 className="text-base font-medium text-wm-text">
                  See the response behind the failure
                </h3>
                <p className="text-sm font-normal text-wm-muted leading-relaxed">
                  Whatever your site served when the check failed is usually gone by the time anyone looks. Watchman keeps it: the status code, the response headers, and the start of the page itself.
                </p>

                <div className="space-y-5 pt-2">
                  <div>
                    <h4 className="text-sm font-semibold text-wm-text">Compare what each region saw</h4>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Every request made around the outage is listed with its own result, plus a breakdown of where the time went across DNS, TCP, SSL, and waiting for the response.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-wm-text">Start with a plain explanation</h4>
                    <p className="text-xs font-normal text-wm-muted mt-1 leading-relaxed">
                      Each failure opens with a sentence saying what went wrong, measured against the validation rules the monitor was using at the time.
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
