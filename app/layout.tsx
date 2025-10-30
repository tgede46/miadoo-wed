import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

export const metadata: Metadata = {
  title: "Miadoo - Plateforme de Services Culturels",
  description: "Découvrez et réservez des services culturels authentiques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <ThemeProvider>
          <AuthProvider>
            <NotificationsProvider>
              <FavoritesProvider>
                {children}
              </FavoritesProvider>
            </NotificationsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
