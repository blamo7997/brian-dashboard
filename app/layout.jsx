export const metadata = {
  title: "Brian & Co Backend",
  description: "Brian & Co backend and API service."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}