"use client";

export default function VSLPlayer() {
  const src = process.env.NEXT_PUBLIC_VSL_URL;

  if (!src) {
    return (
      <div className="w-full aspect-video bg-vault-gold/5 border border-hairline rounded-xl flex items-center justify-center">
        <p className="text-vault-muted text-sm text-center px-4">
          Set <code className="text-vault-gold">NEXT_PUBLIC_VSL_URL</code> in Vercel to embed your VSL
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-hairline shadow-2xl">
      <iframe
        src={src}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Capital Vault — Free Training"
      />
    </div>
  );
}
