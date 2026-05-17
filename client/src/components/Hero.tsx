export function Hero() {
  return (
    <>
      <div
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(180deg,rgba(82,132,239,0.95),rgba(37,91,191,0.88))] text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_30px_rgba(2,15,48,0.22)]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
          <path
            d="M12 5.25c-4 0-7.25 2.57-7.25 5.75 0 1.74.98 3.3 2.52 4.35-.09.97-.47 1.87-1.09 2.6a.75.75 0 0 0 .74 1.23c1.67-.3 3.14-.95 4.3-1.88.3.03.54.05.78.05 4 0 7.25-2.57 7.25-5.75s-3.25-5.75-7.25-5.75Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <header className="max-w-[620px] pt-2 sm:pt-[18px]">
        <p className="mb-5 text-[clamp(2rem,4vw,2.7rem)] font-extrabold tracking-[-0.04em]">
          Hi there!
        </p>
        <h1 className="max-w-[720px] text-[clamp(2.8rem,6vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.06em]">
          What would you like to know?
        </h1>
        <p className="mt-[22px] max-w-[460px] text-[clamp(1.1rem,2.5vw,1.5rem)] leading-[1.45] text-slate-200/75">
          Use one of the most common prompts below or ask your own question
        </p>
      </header>
    </>
  );
}
