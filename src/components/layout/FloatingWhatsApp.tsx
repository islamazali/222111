// src/components/layout/FloatingWhatsApp.tsx (FULL UPDATED — no overlap + no click issues + premium motion)

import { MessageCircle } from 'lucide-react';

type Props = {
  phone: string; // مثال: 201507619503
  prefill?: string;
  position?: 'left' | 'right';
};

function pushDL(event: string, payload: Record<string, unknown> = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (!w.dataLayer) w.dataLayer = [];
  w.dataLayer.push({ event, ...payload });
}

export function FloatingWhatsApp({
  phone,
  prefill = 'عايز استفسار سريع عن مشروع.',
  position = 'left',
}: Props) {
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(prefill)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل واتساب"
      onClick={() => pushDL('lead_click_whatsapp', { source: 'floating_whatsapp' })}
      className={[
        'fixed z-[60] bottom-24', // فوق BackToTop
        position === 'left' ? 'left-6' : 'right-6',
        'group',
      ].join(' ')}
    >
      <div
        className={[
          'relative flex items-center gap-3',
          'px-4 py-3 rounded-2xl',
          'bg-emerald-600 text-white',
          'shadow-lg shadow-emerald-600/25',
          'transition-[transform,box-shadow,background-color] duration-300',
          '[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary-900',
        ].join(' ')}
      >
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/15">
          <MessageCircle className="w-6 h-6" />
        </span>

        <div className="text-right leading-tight">
          <div className="text-sm font-bold">واتساب</div>
          <div className="text-xs text-white/85">رد سريع خلال اليوم</div>
        </div>

        {/* halo (behind, no click issues) */}
        <span className="pointer-events-none absolute -inset-2 -z-10 rounded-[28px] bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300" />
      </div>
    </a>
  );
}
