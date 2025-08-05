export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="bg-red-600 text-white text-sm text-center font-bold p-2 capitalize">
      {children}
    </p>
  );
}
