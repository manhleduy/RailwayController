import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowRight, MessageCircle, Sparkles, TrainFront } from 'lucide-react';

const contactCategories = [
  { value: 'feedback', label: 'General feedback' },
  { value: 'bug', label: 'Report a bug' },
  { value: 'feature', label: 'Feature request' },
  { value: 'support', label: 'Support request' },
];

function FieldShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{label}</span>
      <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 focus-within:border-emerald-400/60 focus-within:bg-white/8 focus-within:ring-2 focus-within:ring-emerald-400/20">
        {children}
      </div>
    </label>
  );
}

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(contactCategories[0].value);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const isFormValid = useMemo(
    () => !!name.trim() && !!email.trim() && !!subject.trim() && !!message.trim(),
    [name, email, subject, message]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      toast.error('Please fill in all fields before sending your feedback.');
      return;
    }

    setIsSending(true);

    try {
      const body = encodeURIComponent(
        `Category: ${category}\nName: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
      );
      const mailtoLink = `mailto:support@trainrag.com?subject=${encodeURIComponent(
        subject.trim()
      )}&body=${body}`;

      window.location.href = mailtoLink;
      toast.success('Opening your email client to send feedback.');
    } catch (error) {
      toast.error('Unable to open email client. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-2xl px-2 py-1 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="TrainRag home"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-emerald-500/20">
              <TrainFront className="size-6" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                TrainRag
              </span>
              <span className="block text-xs text-slate-400">Contact support</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Back to home
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_32px_90px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
                <Sparkles className="size-4 text-emerald-300" aria-hidden="true" />
                Feedback & issues
              </div>
              <div className="space-y-3">
                <p className="text-lg font-semibold tracking-tight text-white">We’re here to help.</p>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">
                  Share your feedback, report bugs, or request new features. Our support team is ready to make TrainRag smoother for every traveler.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Support</p>
                  <p className="mt-3 text-lg font-semibold text-white">support@trainrag.com</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Response time</p>
                  <p className="mt-3 text-lg font-semibold text-white">Usually within 24 hours</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Tips for faster support</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <li>• Include your email so we can follow up.</li>
                  <li>• Describe the issue or request clearly.</li>
                  <li>• Add screenshots or examples if possible.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_32px_90px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-10">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Send us a message</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Contact support
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Use the form below to send your feedback or report an issue directly from the app.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldShell label="Your name">
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                  </FieldShell>
                  <FieldShell label="Your email">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                  </FieldShell>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldShell label="Category">
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="w-full bg-transparent text-sm text-white focus:outline-none"
                    >
                      {contactCategories.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FieldShell>
                  <FieldShell label="Subject">
                    <input
                      type="text"
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      placeholder="Brief summary"
                      className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                  </FieldShell>
                </div>

                <FieldShell label="Message">
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell us about your experience or problem..."
                    rows={6}
                    className="w-full resize-none bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </FieldShell>

                <button
                  type="submit"
                  disabled={!isFormValid || isSending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? 'Preparing message...' : 'Send feedback'}
                  <MessageCircle className="size-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
