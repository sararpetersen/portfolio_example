export interface PortfolioCase {
  id: number;
  slug: string;
  name: string;
  semester?: string;
  semester_da?: string;
  description: string;
  description_da?: string;
  year: string;
  year_da?: string;
  image: string;
  tools?: string[];
  url: string;
  ai_used?: boolean;
}

const SUPABASE_URL = "https://bbmabdbbjpfqoapbtstm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibWFiZGJianBmcW9hcGJ0c3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjkwNDYsImV4cCI6MjA1ODA0NTA0Nn0.gFnw6GZiMFOCMwy6rAcQFzoK0_qUJCwKNpl-XGzy574";

export const ARCHIVED_CASE_SLUGS = new Set(["singleusesucks", "vinens_essens", "vibeloop"]);
export const NON_ACTIVE_CASE_SLUGS = new Set(["no-project", "404_noproject"]);

export async function fetchPortfolioCases(): Promise<PortfolioCase[]> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_cases?order=id.asc`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    });

    if (!response.ok) {
      console.warn(`Portfolio API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const projects = await response.json();
    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error("Failed to fetch portfolio cases:", error);
    return [];
  }
}
