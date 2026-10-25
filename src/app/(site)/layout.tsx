import { CursorFollower } from "@/components/cursor-follower";
import { Footer } from "@/components/footer";
import { Intro } from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { SkipLink } from "@/components/skip-link";

/**
 * Every page of the portfolio: the name intro (first visit of a session), a
 * skip link, the navbar, the page, the footer, and the trailing cursor ring.
 * Games (app/(game)) skip all of it.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Intro />
      <SkipLink />
      <Navbar />
      <main id="content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <CursorFollower />
    </>
  );
}
