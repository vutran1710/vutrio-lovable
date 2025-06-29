import Link from "next/link";
import { Header, Footer, PageContainer, PageMain } from "@/ui";
import Image from "next/image";

export default function NotFound() {
  return (
    <PageContainer>
      <Header currentPath="/not-found" />
      <PageMain>
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <Image
              src="/not-found.png"
              alt="Page not found"
              width={400}
              height={400}
              className="mx-auto opacity-90"
            />
          </div>

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
          </div>
        </div>
      </PageMain>
      <Footer />
    </PageContainer>
  );
}
