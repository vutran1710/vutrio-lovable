import Link from "next/link";
import { Header, Footer, PageContainer, PageMain } from "@/ui";

export default function NotFound() {
  return (
    <PageContainer>
      <Header currentPath="/not-found" />
      <PageMain>
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <img
              src="/placeholder.svg"
              alt="Page not found"
              className="mx-auto w-64 h-64 opacity-50"
            />
          </div>

          <h1 className="font-display text-6xl font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="font-display text-2xl font-semibold text-muted-foreground mb-4">
            Page Not Found
          </h2>
          <p className="font-serif text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Return to Home
            </Link>
            <div className="text-sm text-muted-foreground">
              or{" "}
              <Link href="/logbook" className="text-primary hover:underline">
                browse the logbook
              </Link>
            </div>
          </div>
        </div>
      </PageMain>
      <Footer />
    </PageContainer>
  );
}
