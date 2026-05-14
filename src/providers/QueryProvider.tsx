import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "../App"
const queryClient = new QueryClient()
const QueryProvider = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    )
}

export default QueryProvider