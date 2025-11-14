import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./assets/pages/AppContent/AppContent";
import { ThemeProvider } from "./assets/theme/ThemeProvider/ThemeProvider";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
