import { useEffect, useState } from 'react';
import {
  Check, X, Minus, Plus, Truck, ShieldCheck, Loader2,
  Wallet, ArrowLeft, ArrowRight, PartyPopper, Trash2,
} from 'lucide-react';
import type { Copy, Lang } from '../i18n';
import { COLORS, CITIES } from '../i18n';
import { Bottle } from './Bottle';
import { supabase } from '../lib/supabase';

const MAX_STOCK = 
const UNIT = 15;
const DELIVERY = 2;
const SHEETDB_URL = 'https://sheetdb.io/api/v1/0w62f5fizw9co';

type Status = 'idle' | 'loading' | 'success' | 'error';
type ColorId = 'white' | 'black';

export function Checkout({
  copy, lang, onBack,
}: { copy: Copy; lang: Lang; onBack: () => void }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  const isRtl = lang === 'ar';
  const [qty, setQty] = useState<Record<ColorId, number>>({ white: 0, black: 1 });
  const [status, setStatus] = useState<Status>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; ok: boolean }>({ show: false, ok: true });
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '', notes: '' });
  const [phoneErr, setPhoneErr] = useState(false);

  const setQtyFor = (c: ColorId, n: number) =>
    setQty((q) => ({ ...q, [c]: Math.max(0, Math.min(MAX_STOCK, n)) }));

  const inc = (c: ColorId) => setQtyFor(c, qty[c] + 1);
  const dec = (c: ColorId) => setQtyFor(c, qty[c] - 1);

  const totalUnits = qty.black + qty.white;
  const subtotal = totalUnits * UNIT;
  const total = subtotal + DELIVERY;

  const validatePhone = (v: string) => /^07\d{8}$/.test(v.replace(/[\s-]/g, ''));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneValid = validatePhone(form.phone);
    setPhoneErr(!phoneValid);
    if (!form.name || !phoneValid || !form.city || !form.address || totalUnits === 0) return;

    setStatus('loading');

    const parts: string[] = [];
    if (qty.black > 0) parts.push(`${qty.black} ${lang === 'ar' ? 'أسود' : 'Black'}`);
    if (qty.white > 0) parts.push(`${qty.white} ${lang === 'ar' ? 'أبيض' : 'White'}`);
    const colorField = parts.length === 2
      ? (lang === 'ar' ? 'أسود وأبيض' : 'Black & White')
      : (qty.black > 0
          ? (lang === 'ar' ? 'أسود' : 'Black')
          : (lang === 'ar' ? 'أبيض' : 'White'));
    const quantityField = `${totalUnits} (${parts.join(', ')})`;
    const cityLabel = CITIES.find((c) => c.id === form.city)?.[lang] || form.city;
    const date = new Date().toISOString();

    const payload = {
      name: form.name,
      phone: form.phone,
      city: cityLabel,
      address: form.address,
      color: colorField,
      quantity: quantityField,
      total_price: `${total} ${copy.priceCurrency}`,
      notes: form.notes,
      date,
    };
    try {
      const res = await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ data: [payload] }),
      });
      if (!res.ok) throw new Error('sheetdb failed');
      try {
        await supabase.from('orders').insert({
          full_name: form.name, phone: form.phone,
          city: cityLabel, address: form.address,
          notes: form.notes,
          color: colorField, quantity: quantityField, total,
        });
      } catch { /* best-effort mirror */ }
      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch { /* best-effort email */ }
      setStatus('success');
      setShowSuccess(true);
      setForm({ name: '', phone: '', city: '', address: '', notes: '' });
      setQty({ white: 0, black: 1 });
    } catch {
      setStatus('error');
      setToast({ show: true, ok: false });
    }
  };

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, ok: toast.ok }), 4800);
    return () => clearTimeout(t);
  }, [toast]);

  const input = (field: keyof typeof form) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value })),
  });

  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <section id="order" className="relative min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 start-1/4 w-[600px] h-[600px] rounded-full bg-aura-gold/8 blur-[120px]" />
        <div className="absolute bottom-0 end-1/4 w-[500px] h-[500px] rounded-full bg-aura-gold/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-silver-400 hover:text-silver-100 transition-colors mb-6 ${fontClass}`}
          >
            <BackArrow size={13} />
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
          </button>
          <h2 className={`font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight silver-text mb-3 ${fontClass}`}>
            {copy.checkoutTitle}
          </h2>
          <p className={`text-silver-400 text-base sm:text-lg ${fontClass}`}>{copy.checkoutSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-14 items-start">
          {/* ── LEFT COLUMN: Cart ── */}
          <div className="order-2 lg:order-1 space-y-5">
            <div className="rounded-3xl glass p-6 sm:p-7">
              <h3 className={`text-xs font-bold tracking-[0.25em] uppercase text-silver-400 mb-5 ${fontClass}`}>
                {lang === 'ar' ? 'سلة الطلب' : 'Your Cart'}
              </h3>

              <div className="space-y-4">
                {COLORS.map((c) => {
                  const count = qty[c.id as ColorId];
                  const active = count > 0;
                  return (
                    <div
                      key={c.id}
                      className={`rounded-2xl border p-4 transition-all duration-300 ${
                        active ? 'border-aura-gold/40 bg-aura-gold/5' : 'border-white/10 bg-ink-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0 w-20 h-24 flex items-center justify-center rounded-xl overflow-hidden bg-ink-900/60">
                          <div
                            className="absolute inset-0"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,106,0.18) 0%, transparent 70%)' }}
                          />
                          <Bottle color={c.id as ColorId} className="relative z-10 w-14 h-auto" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0"
                              style={{ background: c.hex, boxShadow: '0 0 0 1px rgba(255,255,255,0.15)' }}
                            />
                            <p className={`text-sm font-bold text-silver-50 truncate ${fontClass}`}>{c[lang]}</p>
                          </div>
                          <p className={`text-xs text-silver-400 ${fontClass}`}>
                            {UNIT} {copy.priceCurrency} · {lang === 'ar' ? 'المخزون' : 'Stock'} {count}/{MAX_STOCK}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-ink-800/60 overflow-hidden shrink-0">
                          <button type="button" onClick={() => dec(c.id as ColorId)} disabled={count <= 0}
                            className="w-9 h-9 flex items-center justify-center text-silver-300 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                            {count <= 0 ? <Trash2 size={13} /> : <Minus size={14} />}
                          </button>
                          <span className={`w-9 text-center text-sm font-bold text-silver-50 ${fontClass}`}>{count}</span>
                          <button type="button" onClick={() => inc(c.id as ColorId)} disabled={count >= MAX_STOCK}
                            className="w-9 h-9 flex items-center justify-center text-silver-300 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {active && (
                        <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-aura-gold to-aura-gold-light transition-all duration-500"
                            style={{ width: `${(count / MAX_STOCK) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pricing breakdown */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
                <div className={`flex items-center justify-between text-sm ${fontClass}`}>
                  <span className="text-silver-300">{copy.priceProduct} × {totalUnits}</span>
                  <span className="font-semibold text-silver-50">{subtotal} {copy.priceCurrency}</span>
                </div>
                <div className={`flex items-center justify-between text-sm ${fontClass}`}>
                  <span className="text-silver-300">{copy.priceDelivery}</span>
<span className="font-semibold text-silver-50">{DELIVERY === 0 ? (lang === 'ar' ? 'مجاني' : 'Free') : `${DELIVERY} ${copy.priceCurrency}`}</span>
                </div>
                <div className="border-t border-white/10 pt-2.5 mt-2.5">
                  <div className={`flex items-center justify-between ${fontClass}`}>
                    <span className="text-base font-bold text-silver-50">{copy.priceTotal}</span>
                    <span className="text-2xl font-extrabold gold-text">{total} {copy.priceCurrency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Wallet, label: lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery' },
                { icon: Truck, label: lang === 'ar' ? 'توصيل لكل الأردن' : 'Across Jordan' },
                { icon: ShieldCheck, label: lang === 'ar' ? 'ضمان الجودة' : 'Quality Guaranteed' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 rounded-xl glass-sm px-2 py-3 text-center">
                  <Icon size={15} className="text-aura-gold shrink-0" />
                  <span className={`text-[10px] font-medium text-silver-200 leading-tight ${fontClass}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Form ── */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="rounded-3xl glass p-7 sm:p-9 space-y-6">
              {/* Name */}
              <div>
                <label className={`form-label ${fontClass}`}>{copy.formName} *</label>
                <input
                  {...input('name')} type="text" required
                  placeholder={copy.formNamePh}
                  className={`form-input ${fontClass}`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`form-label ${fontClass}`}>{copy.formPhone} *</label>
                <input
                  {...input('phone')} type="tel" required dir="ltr"
                  placeholder={copy.formPhonePh}
                  className={`form-input text-start ${fontClass} ${
                    phoneErr ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : ''
                  }`}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, phone: e.target.value }));
                    if (phoneErr) setPhoneErr(false);
                  }}
                />
                {phoneErr && <p className={`text-xs text-red-400 mt-1.5 ${fontClass}`}>{copy.formPhoneErr}</p>}
              </div>

              {/* City */}
              <div>
                <label className={`form-label ${fontClass}`}>{copy.formCity} *</label>
                <select
                  {...input('city')} required value={form.city}
                  className={`form-input ${fontClass} ${form.city ? 'text-silver-100' : 'text-silver-500'}`}
                >
                  <option value="" disabled>{copy.formCityPh}</option>
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-ink-800 text-silver-100">{c[lang]}</option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label className={`form-label ${fontClass}`}>{copy.formAddress} *</label>
                <textarea
                  {...input('address')} required rows={2}
                  placeholder={copy.formAddressPh}
                  className={`form-input resize-none ${fontClass}`}
                />
              </div>

              {/* Notes */}
              <div>
                <label className={`form-label ${fontClass}`}>{copy.formNotes}</label>
                <textarea
                  {...input('notes')} rows={2}
                  placeholder={copy.formNotesPh}
                  className={`form-input resize-none ${fontClass}`}
                />
              </div>

              {/* COD notice */}
              <div className="flex items-start gap-3 rounded-xl bg-aura-gold/8 border border-aura-gold/25 p-4">
                <Wallet size={17} className="text-aura-gold shrink-0 mt-0.5" />
                <div>
                  <p className={`text-sm font-bold text-silver-50 ${fontClass}`}>{copy.codTitle}</p>
                  <p className={`text-xs text-silver-300 mt-1 ${fontClass}`}>{copy.codDesc}</p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading' || totalUnits === 0}
                className={`btn-gold w-full py-4 rounded-xl text-sm tracking-wide inline-flex items-center justify-center gap-2 disabled:opacity-60 ${fontClass}`}
              >
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" />{copy.submitting}</>
                ) : totalUnits === 0 ? (
                  lang === 'ar' ? 'أضف منتجًا للسلة' : 'Add a product to cart'
                ) : (
                  <>{copy.submitBtn} — {total} {copy.priceCurrency}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Premium animated success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-5 animate-fade-in">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />
          <div className="relative z-10 max-w-md w-full rounded-3xl glass p-8 sm:p-10 text-center animate-pop-in">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-aura-gold to-aura-gold-dark flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(201,168,106,0.5)]">
              <PartyPopper size={36} className="text-ink-950" strokeWidth={2.2} />
            </div>
            <h3 className={`text-2xl font-extrabold silver-text mb-3 ${fontClass}`}>
              {lang === 'ar' ? 'تم تأكيد طلبك!' : 'Order Confirmed!'}
            </h3>
            <p className={`text-silver-300 text-sm mb-7 ${fontClass}`}>
              {copy.successToast}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className={`btn-gold w-full py-3.5 rounded-xl text-sm ${fontClass}`}
            >
              {lang === 'ar' ? 'تم' : 'Done'}
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] transition-all duration-400 ${toast.show ? 'animate-toast-in' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className={`rounded-2xl px-6 py-4 flex items-center gap-3 shadow-2xl border glass ${toast.ok ? 'border-emerald-400/30' : 'border-red-400/30'}`}>
          <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${toast.ok ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
            {toast.ok
              ? <Check size={18} className="text-emerald-400" strokeWidth={2.5} />
              : <X size={18} className="text-red-400" strokeWidth={2.5} />}
          </span>
          <p className={`text-sm font-medium text-silver-100 ${fontClass}`}>
            {toast.ok ? copy.successToast : copy.errorToast}
          </p>
        </div>
      </div>
    </section>
  );
}
