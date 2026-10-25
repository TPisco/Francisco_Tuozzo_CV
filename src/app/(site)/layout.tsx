import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

/** Every page of the portfolio: navbar on top, footer below. Games (app/(game)) skip both. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
