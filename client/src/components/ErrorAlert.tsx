type ErrorAlertProps = {
  message: string;
};

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="w-full max-w-[560px] rounded-[18px] border border-[rgba(125,164,255,0.2)] bg-[rgba(84,124,217,0.18)] px-4 py-3.5 text-[rgb(223,234,255)]">
      {message}
    </div>
  );
}
