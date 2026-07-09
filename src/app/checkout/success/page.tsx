'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchCheckoutStatus } from '@/lib/masterApi';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'ok' | 'pending' | 'error'>('loading');
  const [email, setEmail] = useState('');

  const mode = searchParams.get('mode');
  const sessionId = searchParams.get('session_id');
  const directEmail = searchParams.get('email');

  useEffect(() => {
    if (mode === 'direct' && directEmail) {
      setEmail(directEmail);
      setStatus('ok');
      return;
    }

    if (!sessionId) {
      setStatus('ok');
      return;
    }

    fetchCheckoutStatus(sessionId)
      .then((data) => {
        if (data.customer_email) setEmail(data.customer_email);
        setStatus(data.status === 'paid' ? 'ok' : 'pending');
      })
      .catch(() => setStatus('error'));
  }, [mode, sessionId, directEmail]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      {status === 'loading' && (
        <>
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Confirmando pagamento...</p>
        </>
      )}

      {status === 'ok' && (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Pagamento confirmado!</h1>
          <p className="mt-3 text-muted-foreground">
            Sua conta está sendo ativada. Em instantes você receberá um e-mail com login e senha
            {email ? (
              <>
                {' '}
                em <strong>{email}</strong>
              </>
            ) : (
              ''
            )}
            .
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Voltar ao início
          </Link>
        </>
      )}

      {status === 'pending' && (
        <>
          <h1 className="text-2xl font-bold">Pagamento em processamento</h1>
          <p className="mt-3 text-muted-foreground">
            Assim que o pagamento for confirmado, enviaremos o acesso por e-mail.
          </p>
          <Link href="/" className="mt-8 text-sm font-medium text-primary hover:underline">
            Voltar ao início
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-2xl font-bold">Não foi possível confirmar</h1>
          <p className="mt-3 text-muted-foreground">
            Se o pagamento foi aprovado, aguarde o e-mail de acesso ou entre em contato com o suporte.
          </p>
          <Link href="/" className="mt-8 text-sm font-medium text-primary hover:underline">
            Voltar ao início
          </Link>
        </>
      )}
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Carregando...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
