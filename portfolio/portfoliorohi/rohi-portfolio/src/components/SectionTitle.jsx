function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  const isLeft = align === 'left';
  return (
    <div className={`${isLeft ? 'text-left' : 'text-center mx-auto'} max-w-3xl`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-400">
        {eyebrow}
      </p>
      <h2
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {!isLeft && <div className="section-divider mt-5" />}
      {isLeft && <div className="section-divider-left section-divider mt-5" />}
      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-400">{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;
